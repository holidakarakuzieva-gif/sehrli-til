import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { ALL_UNIT_SUMMARIES } from '@/content/worldMap';
import { useTranslation } from '@/i18n';
import { useUzText } from '@/lib/useUzText';
import { Humocha } from '@/components/mascot/Humocha';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface StageModulePageProps {
  sectionKey:
    | 'lesson'
    | 'dictionary'
    | 'lab'
    | 'translation'
    | 'stories'
    | 'games'
    | 'riddles'
    | 'tests'
    | 'achievements'
    | 'alphabet'
    | 'safety'
    | 'parents'
    | 'teacher';
}

export default function StageModulePage({ sectionKey }: StageModulePageProps) {
  const { unitId } = useParams<{ unitId: string }>();
  const { t, lang } = useTranslation();
  const uzText = useUzText();

  const unit = unitId ? ALL_UNIT_SUMMARIES.find((u) => u.id === unitId) : undefined;

  const titleMap: Record<StageModulePageProps['sectionKey'], string> = {
    lesson: unit ? uzText(unit.title.uz) : t.nav.map,
    dictionary: t.nav.dictionary,
    lab: t.nav.lab,
    translation: t.nav.translation,
    stories: t.nav.stories,
    games: t.nav.games,
    riddles: t.nav.riddles,
    tests: t.nav.tests,
    achievements: t.nav.achievements,
    alphabet: t.nav.alphabet,
    safety: t.nav.safety,
    parents: t.nav.parents,
    teacher: t.nav.teacher,
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="text-center space-y-5 py-8">
        <Humocha mood="thinking" size={140} />

        <div className="space-y-2">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--accent-sky-strong)]">
            {t.stageNotice.badge}
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            {unit ? `${unit.icon} ${titleMap[sectionKey]}` : titleMap[sectionKey]}
          </h1>
          {unit && lang !== 'uz' && (
            <p className="text-base font-bold text-[var(--text-secondary)]">
              {unit.title[lang]}
            </p>
          )}
        </div>

        <p className="text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          {unit ? t.map.lessonPreviewNotice : t.stageNotice.description}
        </p>

        {unit && (
          <div className="max-w-lg mx-auto rounded-2xl bg-[var(--bg-surface-muted)] border border-[var(--border-subtle)] p-4 text-left space-y-1.5">
            <p className="text-xs font-extrabold uppercase text-[var(--text-secondary)]">
              {t.stageNotice.unitOverviewTitle} · {unit.grade === 2 ? t.common.grade2 : t.common.grade3}
            </p>
            <p className="font-bold text-sm sm:text-base">
              {lang === 'uz' ? uzText(unit.subtitle.uz) : unit.subtitle[lang]}
            </p>
            <p className="text-xs font-bold text-[var(--text-secondary)] tabular-nums">
              {unit.order}
              {t.map.islandNumber} · {unit.wordCountTarget} {t.map.wordsTarget}
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/xarita">
            <Button>
              <Compass className="w-5 h-5" />
              <span>{t.common.openMap}</span>
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary">
              <ArrowLeft className="w-5 h-5" />
              <span>{t.common.backHome}</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
