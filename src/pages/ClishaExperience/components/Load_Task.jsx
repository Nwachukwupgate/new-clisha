import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useClishaTheme } from '../context/ThemeContext';
import { BRAND } from '../design-system/tokens';

const STYLES = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes progressFill {
    from { width: 0%; }
    to   { width: var(--pct); }
  }
  @keyframes shimmer {
    0%   { left: -100%; }
    100% { left: 200%; }
  }
  .token-card:hover {
    transform: translateY(-2px) !important;
    filter: brightness(1.06) !important;
  }
  .show-more-btn:hover {
    background: ${BRAND.primary} !important;
    color: #fff !important;
    border-color: ${BRAND.primary} !important;
  }
`;

function TokenCard({ item, index }) {
  const pct = Math.min(100, Math.max(0, item?.percentage ?? 0));
  const bg  = item?.background || BRAND.primary;

  /* derive a lighter tint from the card background for the progress track */
  const trackAlpha = 'rgba(0,0,0,0.2)';

  return (
    <div
      className="token-card"
      style={{
        borderRadius: 16,
        background: `linear-gradient(135deg, ${bg} 0%, ${bg}cc 100%)`,
        padding: '16px 18px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease',
        boxShadow: `0 4px 18px ${bg}55`,
        animation: `fadeSlideUp 0.35s ease ${index * 55}ms both`,
      }}
    >
      {/* decorative radial glow in top-right */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -10, left: '30%',
        width: 50, height: 50, borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)',
        pointerEvents: 'none',
      }} />

      {/* top row: name + percentage */}
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', gap: 10,
        marginBottom: 6,
      }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700, fontSize: 14,
          color: '#fff',
          textTransform: 'capitalize',
          lineHeight: 1.3,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          maxWidth: '70%',
        }}>
          {item?.name}
        </span>
        <span style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 900, fontSize: 15,
          color: '#fff',
          flexShrink: 0,
          background: 'rgba(255,255,255,0.18)',
          padding: '2px 9px', borderRadius: 20,
          lineHeight: 1.5,
        }}>
          {pct}%
        </span>
      </div>

      {/* description */}
      {item?.description && (
        <p style={{
          margin: '0 0 12px',
          fontSize: 12, fontWeight: 500,
          color: 'rgba(255,255,255,0.72)',
          lineHeight: 1.45,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {item.description}
        </p>
      )}

      {/* progress bar */}
      <div style={{
        height: 6, borderRadius: 6,
        background: trackAlpha,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: 6,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.95))',
          boxShadow: '0 0 8px rgba(255,255,255,0.5)',
          position: 'relative',
          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
        }}>
          {/* shimmer */}
          {pct > 5 && (
            <div style={{
              position: 'absolute', top: 0, left: '-100%',
              width: '55%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
              animation: 'shimmer 2s ease-in-out infinite',
              borderRadius: 6,
            }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Load_Task(props) {
  const topToken = useSelector((state) => state.general.topToken);
  const th       = useClishaTheme();
  const dark     = th.bg === '#0a0a0a' || th.text === '#ffffff';

  return (
    <div>
      <style>{STYLES}</style>

      {/* section header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 16,
      }}>
        <div style={{
          width: 3, height: 18, borderRadius: 3,
          background: `linear-gradient(180deg, ${BRAND.primary}, ${BRAND.primaryDark})`,
          boxShadow: `0 0 8px rgba(${BRAND.primaryRgb},0.5)`,
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 15, fontWeight: 800,
          color: th.text,
        }}>
          Top Tokens
        </span>
        {topToken?.length > 0 && (
          <span style={{
            marginLeft: 4,
            fontSize: 11, fontWeight: 700,
            padding: '2px 9px', borderRadius: 20,
            background: `rgba(${BRAND.primaryRgb},0.12)`,
            border: `1px solid rgba(${BRAND.primaryRgb},0.25)`,
            color: BRAND.primary,
          }}>
            {Math.min(topToken.length, 10)}
          </span>
        )}
      </div>

      {/* token grid */}
      {topToken?.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12,
          marginBottom: 16,
        }}>
          {topToken.slice(0, 10).map((item, index) => (
            <TokenCard key={index} item={item} index={index} />
          ))}
        </div>
      ) : (
        <div style={{
          padding: '32px 16px', textAlign: 'center',
          color: th.textSub, fontSize: 14,
        }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🪙</div>
          <div style={{ fontWeight: 600, color: th.text, marginBottom: 4 }}>No tokens yet</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Complete tasks to earn tokens</div>
        </div>
      )}

      {/* show more */}
      <div style={{ textAlign: 'center', paddingTop: 4 }}>
        <Link
          to="/dashboard/token"
          className="show-more-btn"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '9px 22px', borderRadius: 22,
            border: `1.5px solid rgba(${BRAND.primaryRgb},0.3)`,
            background: `rgba(${BRAND.primaryRgb},0.07)`,
            color: BRAND.primary,
            textDecoration: 'none',
            fontSize: 13, fontWeight: 700,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: 'all 0.18s',
          }}
        >
          <span>🪙</span>
          View all tokens
          <span style={{ opacity: 0.6, fontSize: 12 }}>→</span>
        </Link>
      </div>
    </div>
  );
}
