import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  Compass,
  Eye,
  EyeOff,
  Flame,
  FlaskConical,
  Gamepad2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { AVATAR_OPTIONS } from '@/config/theme';
import { ALL_UNIT_SUMMARIES, getWordOfTheDay } from '@/content/worldMap';
import type { Lang } from '@/content/types';
import { useTranslation } from '@/i18n';
import { playSfx } from '@/lib/sfx';
import { useUzText } from '@/lib/useUzText';
import { useProgress } from '@/store/useProgress';
import { useSettings } from '@/store/useSettings';
import { Humocha, type HumochaMood } from '@/components/mascot/Humocha';
import { AudioButton } from '@/components/ui/AudioButton';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SmartImage } from '@/components/ui/SmartImage';

const MOOD_CYCLE: HumochaMood[] = ['happy', 'encouraging', 'thinking', 'sleeping'];

export default function HomePage() {
  const { t, lang } = useTranslation();
  const uzText = useUzText();

  const profile = useProgress((s) => s.profile);
  const setProfile = useProgress((s) => s.setProfile);
  const stars = useProgress((s) => s.stars);
  const feathers = useProgress((s) => s.feathers);
  const streakDays = useProgress((s) => s.streakDays);
  const completedUnits = useProgress((s) => s.completedUnits);
  const currentUnitId = useProgress((s) => s.currentUnitId);

  const soundEnabled = useSettings((s) => s.soundEnabled);
  const magicGlasses = useSettings((s) => s.magicGlasses);
  const setLang = useSettings((s) => s.setLang);

  const [moodIdx, setMoodIdx] = useState(0);
  const [revealWordTranslation, setRevealWordTranslation] = useState(false);

  // Inline first-visit setup state
  const [nicknameInput, setNicknameInput] = useState('');
  const [avatarInput, setAvatarInput] = useState(AVATAR_OPTIONS[0].id);
  const [gradeInput, setGradeInput] = useState<2 | 3>(2);

  const currentMood = MOOD_CYCLE[moodIdx];
  const dailyWord = getWordOfTheDay();
  const currentUnit =
    ALL_UNIT_SUMMARIES.find((u) => u.id === currentUnitId) ?? ALL_UNIT_SUMMARIES[0];

  const moodSpeech =
    currentMood === 'happy'
      ? t.home.humoMoodHappy
      : currentMood === 'encouraging'
      ? t.home.humoMoodEncouraging
      : currentMood === 'thinking'
      ? t.home.humoMoodThinking
      : t.home.humoMoodSleeping;

  const handleHumoClick = () => {
    playSfx('pop', soundEnabled);
    setMoodIdx((prev) => (prev + 1) % MOOD_CYCLE.length);
  };

  const handleQuickProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned =
      nicknameInput.trim() || (lang === 'ru' ? 'Друг' : lang === 'en' ? 'Friend' : 'Doʻst');
    setProfile({ nickname: cleaned, avatarId: avatarInput, grade: gradeInput });
    playSfx('celebrate', soundEnabled);
  };

  const showTranslation = !magicGlasses || revealWordTranslation;

  const rooms = [
    {
      to: '/xarita',
      title: t.nav.map,
      desc: t.home.moduleDescMap,
      icon: Compass,
      iconClass: 'bg-[#FFF3E6] text-[#B34200] dark:bg-[#2B231E] dark:text-[#FFB380]',
    },
    {
      to: '/lugat',
      title: t.nav.dictionary,
      desc: t.home.moduleDescDict,
      icon: BookOpen,
      iconClass: 'bg-[#EAF6FF] text-[#0369A1] dark:bg-[#1A293E] dark:text-[#7CC7FF]',
    },
    {
      to: '/laboratoriya',
      title: t.nav.lab,
      desc: t.home.moduleDescLab,
      icon: FlaskConical,
      iconClass: 'bg-[#E9FAF7] text-[#0F766E] dark:bg-[#162C2E] dark:text-[#5FE0D3]',
    },
    {
      to: '/oyinlar',
      title: t.nav.games,
      desc: t.home.moduleDescGames,
      icon: Gamepad2,
      iconClass: 'bg-[#F3EEFF] text-[#6D28D9] dark:bg-[#25203D] dark:text-[#C4B5FD]',
    },
    {
      to: '/topishmoqlar',
      title: t.nav.riddles,
      desc: t.home.moduleDescRiddles,
      icon: HelpCircle,
      iconClass: 'bg-[#FFEDF3] text-[#BE185D] dark:bg-[#341E2B] dark:text-[#FF8FB0]',
    },
    {
      to: '/xavfsiz-internet',
      title: t.nav.safety,
      desc: t.home.moduleDescSafety,
      icon: ShieldCheck,
      iconClass: 'bg-[#FFFBE6] text-[#925800] dark:bg-[#2D2A1B] dark:text-[#FFE066]',
    },
  ];

  return (
    <div className="space-y-8">
      {/* First-visit inline personalization card (never a blocking arrival popup) */}
      {!profile && (
        <Card className="bg-[var(--bg-surface)]">
          <form onSubmit={handleQuickProfileSubmit} className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold">{t.onboarding.title}</h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1">
                  {t.onboarding.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {(['ru', 'uz', 'en'] as Lang[]).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    className={`min-h-[44px] px-3 rounded-xl text-xs font-extrabold uppercase border cursor-pointer transition-colors ${
                      lang === code
                        ? 'bg-[#0369A1] text-white border-transparent dark:bg-[#60BCFF] dark:text-[#141B2D]'
                        : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)]'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-nickname" className="block text-sm font-bold mb-1.5">
                  {t.onboarding.nicknameLabel}
                </label>
                <input
                  id="first-nickname"
                  type="text"
                  maxLength={24}
                  value={nicknameInput}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  placeholder={t.onboarding.nicknamePlaceholder}
                  className="w-full min-h-[46px] px-4 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold"
                />

                <span className="block text-sm font-bold mt-4 mb-2">
                  {t.onboarding.gradeLabel}
                </span>
                <div className="flex gap-2">
                  {([2, 3] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGradeInput(g)}
                      className={`flex-1 min-h-[44px] rounded-2xl font-bold text-sm border cursor-pointer transition-colors ${
                        gradeInput === g
                          ? 'bg-[#D95607] text-white border-transparent dark:bg-[#FFA366] dark:text-[#141B2D]'
                          : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)]'
                      }`}
                    >
                      {g === 2 ? t.common.grade2 : t.common.grade3}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold mb-1.5">{t.onboarding.avatarLabel}</span>
                <div className="grid grid-cols-3 gap-2">
                  {AVATAR_OPTIONS.map((av) => {
                    const selected = avatarInput === av.id;
                    return (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setAvatarInput(av.id)}
                        className={`flex flex-col items-center justify-center gap-1 p-2.5 rounded-2xl border cursor-pointer min-h-[68px] transition-colors ${
                          selected
                            ? 'border-[#D95607] bg-[#FFF2DF] dark:border-[#FFA366] dark:bg-[#2F2722]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:bg-[var(--bg-surface-muted)]'
                        }`}
                      >
                        <span className="text-2xl leading-none" aria-hidden="true">
                          {av.emoji}
                        </span>
                        <span className="text-xs font-bold truncate max-w-full">
                          {av.label[lang]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                <span>{t.onboarding.startJourney}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Hero Section: Single focal anchor with Humocha & Primary CTA */}
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="flex flex-col items-center shrink-0">
            <Humocha
              mood={currentMood}
              feathers={feathers}
              size={156}
              onClick={handleHumoClick}
              ariaLabel="Humocha"
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-4 min-w-0">
            <div className="space-y-1.5">
              <p className="text-sm font-bold text-[var(--accent-sunny-strong)]">
                {t.brand.tagline}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                {t.home.greeting}
                {profile ? `, ${profile.nickname}` : ''}!
              </h1>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl">
                {moodSpeech}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <Link to={`/dars/${currentUnit.id}`}>
                <Button size="lg">
                  <span>{t.common.continueBtn}</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/xarita">
                <Button variant="secondary" size="lg">
                  <Compass className="w-5 h-5" />
                  <span>{t.common.openMap}</span>
                </Button>
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-semibold">
              {t.home.continueUnit}:{' '}
              <span className="text-[var(--text-primary)] font-bold">
                {currentUnit.icon} {uzText(currentUnit.title.uz)}
              </span>
              {lang !== 'uz' && !magicGlasses && (
                <span> · {currentUnit.title[lang]}</span>
              )}
            </p>
          </div>
        </div>
      </Card>

      {/* Progress & Humocha Feathers Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FFFBE6] text-[#925800] dark:bg-[#2D2A1B] dark:text-[#FFE066] flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-extrabold tabular-nums leading-tight">{stars}</div>
            <div className="text-xs font-bold text-[var(--text-secondary)] truncate">
              {t.common.stars}
            </div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FFF3E6] text-[#B34200] dark:bg-[#2B231E] dark:text-[#FFB380] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-extrabold tabular-nums leading-tight">{feathers} / 20</div>
            <div className="text-xs font-bold text-[var(--text-secondary)] truncate">
              {t.common.feathers}
            </div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FFEDF3] text-[#BE185D] dark:bg-[#341E2B] dark:text-[#FF8FB0] flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-extrabold tabular-nums leading-tight">{streakDays}</div>
            <div className="text-xs font-bold text-[var(--text-secondary)] truncate">
              {t.common.streak}
            </div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#E9FAF7] text-[#0F766E] dark:bg-[#162C2E] dark:text-[#5FE0D3] flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-extrabold tabular-nums leading-tight">
              {completedUnits.length} / 20
            </div>
            <div className="text-xs font-bold text-[var(--text-secondary)] truncate">
              {t.common.completed}
            </div>
          </div>
        </Card>
      </div>

      {/* Humocha Feather Progress + Word of the Day */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <Card className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold text-[var(--accent-sky-strong)] uppercase tracking-wide">
                {t.home.wordOfDayTitle}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                {uzText(dailyWord.uz)}
              </h2>
              {lang !== 'uz' && (
                <div className="mt-1">
                  {showTranslation ? (
                    <p className="text-lg font-bold text-[var(--text-secondary)]">
                      {dailyWord[lang]}
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setRevealWordTranslation(true)}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent-sky-strong)] hover:underline cursor-pointer min-h-[36px]"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{t.common.showTranslation}</span>
                    </button>
                  )}
                  {magicGlasses && revealWordTranslation && (
                    <button
                      type="button"
                      onClick={() => setRevealWordTranslation(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] hover:underline cursor-pointer mt-0.5"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>{t.common.hideTranslation}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <SmartImage
              alt={dailyWord.uz}
              emoji={dailyWord.emoji}
              width={88}
              height={88}
            />
          </div>

          <AudioButton
            wordId={dailyWord.id}
            uzText={dailyWord.uz}
            pronunciationRu={dailyWord.pronunciationRu}
          />

          <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
            {lang === 'uz' ? uzText(dailyWord.story.uz) : dailyWord.story[lang]}
          </p>

          <div className="pt-3 border-t border-[var(--border-subtle)] text-sm">
            <span className="font-extrabold text-[var(--accent-mint-strong)]">
              {t.home.wordOfDayParentPrompt}:{' '}
            </span>
            <span className="text-[var(--text-secondary)] font-semibold">
              {lang === 'uz'
                ? uzText(dailyWord.parentQuestion.uz)
                : dailyWord.parentQuestion[lang]}
            </span>
          </div>
        </Card>

        <Card className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold">{t.home.featherProgressTitle}</h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              {t.home.featherProgressDesc}
            </p>
          </div>

          <ProgressBar
            value={feathers}
            max={20}
            label={t.common.feathers}
            colorClass="bg-[#FF8A3D]"
          />

          <div className="grid grid-cols-10 gap-1.5 pt-1" aria-hidden="true">
            {Array.from({ length: 20 }, (_, idx) => {
              const collected = idx < feathers;
              return (
                <div
                  key={idx}
                  className={`h-7 rounded-lg flex items-center justify-center text-xs font-bold border ${
                    collected
                      ? 'bg-[#FFF3E6] border-[#FF8A3D] text-[#B34200] dark:bg-[#2B231E] dark:text-[#FFB380]'
                      : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] text-[var(--text-secondary)] opacity-60'
                  }`}
                >
                  🪶
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Magic Rooms Grid */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-extrabold">{t.home.quickModulesTitle}</h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            {t.home.quickModulesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => {
            const Icon = room.icon;
            return (
              <Link key={room.to} to={room.to} className="group block">
                <Card className="h-full transition-transform duration-150 group-hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${room.iconClass}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-sunny-strong)] transition-colors">
                        {room.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mt-1 leading-snug">
                        {room.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
