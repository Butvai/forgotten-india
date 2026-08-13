import Link from 'next/link'

const categories = [
  { name: 'Recipes', slug: 'recipes', emoji: '🍲' },
  { name: 'Songs', slug: 'songs', emoji: '🎵' },
  { name: 'Stories', slug: 'stories', emoji: '📖' },
  { name: 'Remedies', slug: 'remedies', emoji: '🌿' },
  { name: 'Superstitions', slug: 'superstitions', emoji: '🌙' },
  { name: 'Rituals', slug: 'rituals', emoji: '🪔' },
  { name: 'Games', slug: 'games', emoji: '🎯' },
  { name: 'Words', slug: 'words', emoji: '✍️' },
  { name: 'Crafts', slug: 'crafts', emoji: '🏺' },
]

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: 'url(https://static.prod-images.emergentagent.com/jobs/fe2d6d2d-57bf-49b9-9a51-3b960993af4a/images/9c4bae69e462f80ac9a2814df320678111dbeb93cbbbd5bdd571196736715359.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '90vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(20,12,8,0.45) 0%, rgba(30,18,10,0.75) 100%)',
        }} />

        {/* Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 400,
            color: '#f5f0e8',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}>
            Some things were never written down.
          </h1>
          <p style={{
            fontFamily: '"Manrope", system-ui, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(245, 240, 232, 0.85)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
          }}>
            Forgotten India is a living archive of the recipes, songs, stories, remedies, rituals and little pieces of wisdom that survived because someone remembered them.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/share" style={{
              backgroundColor: '#c2714f',
              color: '#f5f0e8',
              padding: '0.875rem 2rem',
              fontFamily: '"Manrope", system-ui, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              border: 'none',
              cursor: 'pointer',
            }}>
              Share something you remember
            </Link>
            <Link href="/india" style={{
              backgroundColor: 'transparent',
              color: '#f5f0e8',
              padding: '0.875rem 2rem',
              fontFamily: '"Manrope", system-ui, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              border: '1px solid rgba(245, 240, 232, 0.6)',
              cursor: 'pointer',
            }}>
              Explore India
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{
        backgroundColor: '#f5f0e8',
        padding: '6rem 2rem',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 400,
            color: '#3d2314',
            textAlign: 'center',
            marginBottom: '0.75rem',
          }}>
            What are we forgetting?
          </h2>
          <p style={{
            fontFamily: '"Manrope", system-ui, sans-serif',
            color: '#7a6355',
            textAlign: 'center',
            marginBottom: '3rem',
            fontSize: '1rem',
          }}>
            Browse by what you are looking for
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1rem',
          }}>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/india`} style={{
                display: 'block',
                padding: '1.5rem',
                backgroundColor: '#fff',
                border: '1px solid #e8ddd4',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'border-color 0.2s',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{cat.emoji}</div>
                <div style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.15rem',
                  color: '#3d2314',
                  fontWeight: 500,
                }}>
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{
        backgroundColor: '#3d2314',
        padding: '6rem 2rem',
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
            fontWeight: 400,
            color: '#f5f0e8',
            lineHeight: 1.3,
            marginBottom: '2rem',
          }}>
            From one generation to another
          </h2>
          <p style={{
            fontFamily: '"Manrope", system-ui, sans-serif',
            color: 'rgba(245, 240, 232, 0.8)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            marginBottom: '1.5rem',
          }}>
            Your grandmother probably never wrote down how much salt went into the rasam. She just knew.
            Your grandfather probably never recorded the song he sang while working. He just remembered it.
          </p>
          <p style={{
            fontFamily: '"Manrope", system-ui, sans-serif',
            color: 'rgba(245, 240, 232, 0.8)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            A neighbour may know a remedy that has existed in your village for generations. Nobody put it on the internet. Until now.
          </p>
          <Link href="/share" style={{
            backgroundColor: '#c2714f',
            color: '#f5f0e8',
            padding: '0.875rem 2rem',
            fontFamily: '"Manrope", system-ui, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 500,
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}>
            What do you remember?
          </Link>
        </div>
      </section>
    </main>
  )
}
