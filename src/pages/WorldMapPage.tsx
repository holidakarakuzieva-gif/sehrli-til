import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Compass, PlayCircle } from 'lucide-react';
import { UNIT_COLOR_PALETTE } from '@/config/theme';
import { GRADE_2_UNITS, GRADE_3_UNITS } from '@/content/worldMap';
import { useTranslation } from '@/i18n';
import { useUzText } from '@/lib/useUzText';
import { useProgress } from '@/store/useProgress';
import { useSettings } from '@/store/useSettings';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function WorldMapPage() {
  const { t, lang } = useTranslation();
  const uzText = useUzText();

  const profile = useProgress((s) => s.profile);
  const completedUnits = useProgress((s) => s.completedUnits);
  const currentUnitId = useProgress((s) => s.currentUnitId);
  const magicGlasses = useSettings((s) => s.magicGlasses);

  const [selectedGrade, setSelectedGrade] = useState<2 | 3>(profile?.grade ?? 2);

  const units = selectedGrade === 2 ? GRADE_2_UNITS : GRADE_3_UNITS;
  const completedInGrade = units.filter((u) => completedUnits.includes(u.id)).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{t.map.title}</h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1">
            {t.map.subtitle}
          </p>
        </div>

        {/* Grade / World Switcher */}
        <div
          role="tablist"
          aria-label="Worlds"
          className="inline-flex p-1.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] gap-1.5 self-start"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedGrade === 2}
            onClick={() => setSelectedGrade(2)}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-extrabold whitespace-nowrap cursor-pointer transition-colors ${
              selectedGrade === 2
                ? 'bg-[#2EC4B6] text-[#0F172A]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            🌱 {t.common.grade2} · {uzText(t.common.world2Name)}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedGrade === 3}
            onClick={() => setSelectedGrade(3)}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-extrabold whitespace-nowrap cursor-pointer transition-colors ${
              selectedGrade === 3
                ? 'bg-[#8B5CF6] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            🏰 {t.common.grade3} · {uzText(t.common.world3Name)}
          </button>
        </div>
      </div>

      {/* World Summary Banner */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold">
              {selectedGrade === 2 ? `🌱 ${uzText('Sehrli bogʻ')}` : `🏰 ${uzText('Sehrli qalʼa')}`}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              {selectedGrade === 2 ? t.map.world2Desc : t.map.world3Desc}
            </p>
          </div>
          <div className="w-full sm:w-56 shrink-0">
            <ProgressBar
              value={completedInGrade}
              max={units.length}
              label={t.common.completed}
              colorClass={selectedGrade === 2 ? 'bg-[#2EC4B6]' : 'bg-[#8B5CF6]'}
            />
          </div>
        </div>
      </Card>

      {/* Winding Island Path */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {units.map((unit) => {
          const palette = UNIT_COLOR_PALETTE[unit.color] ?? UNIT_COLOR_PALETTE.sunny;
          const isDone = completedUnits.includes(unit.id);
          const isCurrent = currentUnitId === unit.id;

          return (
            <Link key={unit.id} to={`/dars/${unit.id}`} className="group block">
              <Card
                className={`h-full transition-transform duration-150 group-hover:-translate-y-0.5 ${
                  isCurrent ? 'ring-2 ring-[#D95607] dark:ring-[#FFA366]' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${palette.iconBg}`}
                    aria-hidden="true"
                  >
                    {unit.icon}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-xs font-bold text-[var(--text-secondary)]">
                      <span className="tabular-nums">
                        {unit.order}
                        {t.map.islandNumber} · {unit.wordCountTarget} {t.map.wordsTarget}
                      </span>

                      <span className="inline-flex items-center gap-1 font-extrabold">
                        {isDone ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-[#0F766E] dark:text-[#5FE0D3]" />
                            <span className="text-[#0F766E] dark:text-[#5FE0D3]">
                              {t.common.completed}
                            </span>
                          </>
                        ) : isCurrent ? (
                          <>
                            <PlayCircle className="w-4 h-4 text-[var(--accent-sunny-strong)]" />
                            <span className="text-[var(--accent-sunny-strong)]">
                              {t.common.current}
                            </span>
                          </>
                        ) : (
                          <>
                            <Compass className="w-4 h-4" />
                            <span>{t.common.available}</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-sunny-strong)] transition-colors">
                      {uzText(unit.title.uz)}
                    </h3>

                    {lang !== 'uz' && !magicGlasses && (
                      <p className="text-sm font-bold text-[var(--text-secondary)]">
                        {unit.title[lang]}
                      </p>
                    )}

                    <p className="text-sm text-[var(--text-secondary)] leading-snug">
                      {lang === 'uz' ? uzText(unit.subtitle.uz) : unit.subtitle[lang]}
                    </p>
                  </div>

                  <ArrowRight className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-sunny-strong)] shrink-0 mt-1" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
