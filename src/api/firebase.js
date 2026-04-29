import { initializeApp } from 'firebase/app'
import { 
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore'
import { 
  getAuth, 
  signInAnonymously 
} from 'firebase/auth'

const firebaseConfig = {
  apiKey:            
    import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         
    import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: 
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             
    import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase — gracefully handle 
// missing config (dev without .env)
let app, db, auth

try {
  if (firebaseConfig.apiKey) {
    app  = initializeApp(firebaseConfig)
    db   = getFirestore(app)
    auth = getAuth(app)
    console.warn('[Firebase] Initialized successfully, project:', firebaseConfig.projectId)
  } else {
    console.warn('[Firebase] No API key found — using mock data')
  }
} catch (err) {
  console.warn('[Firebase] Init failed:', err.message)
}

/**
 * Signs in anonymously so we can write to 
 * Firestore without requiring user accounts.
 * Safe to call multiple times.
 */
async function ensureAuth() {
  if (!auth) return
  try {
    await signInAnonymously(auth)
  } catch (err) {
    console.warn('[Firebase] Anonymous auth failed:', err.code, err.message)
    throw err  // re-throw so saveQuizScore knows auth failed
  }
}

/**
 * Saves a quiz score to Firestore.
 * Stored anonymously — no personal data.
 * @param {number} score - Score out of 10
 * @returns {Promise<void>}
 */
export async function saveQuizScore(score) {
  if (!db) {
    console.warn('[Firebase] saveQuizScore skipped — db not initialized')
    return
  }
  try {
    await ensureAuth()
    const docRef = await addDoc(collection(db, 'quizScores'), {
      score,
      timestamp:    serverTimestamp(),
      scorePercent: (score / 10) * 100,
    })
    console.warn('[Firebase] Score saved, doc id:', docRef.id)
  } catch (err) {
    console.warn('[Firebase] Score save failed:', err.code, err.message)
  }
}

/**
 * Fetches the score distribution from Firestore.
 * Returns counts of how many people scored each 
 * value (0-10) for the leaderboard chart.
 * @returns {Promise<Object>} Score distribution
 */
export async function getScoreDistribution() {
  if (!db) return getMockDistribution()
  try {
    const q = query(
      collection(db, 'quizScores'),
      orderBy('timestamp', 'desc'),
      limit(500)
    )
    const snapshot = await getDocs(q)
    
    // Count scores by value
    const distribution = Object.fromEntries(
      Array.from({ length: 11 }, (_, i) => 
        [i, 0])
    )
    snapshot.forEach(doc => {
      const { score } = doc.data()
      if (score >= 0 && score <= 10) {
        distribution[score]++
      }
    })
    
    const total = snapshot.size
    return { distribution, total }
  } catch (err) {
    console.warn('Score fetch failed:', err)
    return getMockDistribution()
  }
}

/**
 * Returns mock distribution data when Firebase 
 * is not configured (dev fallback).
 * @returns {Object} Mock distribution
 */
function getMockDistribution() {
  return {
    distribution: {
      0: 2,  1: 3,  2: 5,  3: 8,
      4: 12, 5: 18, 6: 24, 7: 31,
      8: 27, 9: 19, 10: 11,
    },
    total: 160,
  }
}
