import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Humocha } from '@/components/mascot/Humocha';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-xl mx-auto py-8">
      <Card className="text-center space-y-5 py-8">
        <Humocha mood="thinking" size={150} />
        <div className="space-y-2">
          <p className="text-sm font-extrabold text-[var(--accent-sunny-strong)] tabular-nums">
            404
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{t.notFound.title}</h1>
          <p className="text-base text-[var(--text-secondary)]">{t.notFound.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button>
              <Home className="w-5 h-5" />
              <span>{t.common.backHome}</span>
            </Button>
          </Link>
          <Link to="/xarita">
            <Button variant="secondary">
              <Compass className="w-5 h-5" />
              <span>{t.common.openMap}</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
