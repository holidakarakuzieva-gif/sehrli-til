import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/HomePage'));
const WorldMapPage = lazy(() => import('@/pages/WorldMapPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const StageModulePage = lazy(() => import('@/pages/StageModulePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="py-16 flex items-center justify-center">
      <div
        className="w-10 h-10 rounded-full border-4 border-[var(--bg-surface-muted)] border-t-[#FF8A3D] animate-spin"
        aria-label="Loading"
      />
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/xarita" element={<WorldMapPage />} />
        <Route path="/dars/:unitId" element={<StageModulePage sectionKey="lesson" />} />
        <Route path="/lugat" element={<StageModulePage sectionKey="dictionary" />} />
        <Route path="/laboratoriya" element={<StageModulePage sectionKey="lab" />} />
        <Route path="/tarjima" element={<StageModulePage sectionKey="translation" />} />
        <Route path="/ertaklar" element={<StageModulePage sectionKey="stories" />} />
        <Route path="/oyinlar" element={<StageModulePage sectionKey="games" />} />
        <Route path="/oyinlar/:gameId" element={<StageModulePage sectionKey="games" />} />
        <Route path="/topishmoqlar" element={<StageModulePage sectionKey="riddles" />} />
        <Route path="/testlar" element={<StageModulePage sectionKey="tests" />} />
        <Route path="/testlar/:testId" element={<StageModulePage sectionKey="tests" />} />
        <Route path="/yutuqlar" element={<StageModulePage sectionKey="achievements" />} />
        <Route path="/alifbo" element={<StageModulePage sectionKey="alphabet" />} />
        <Route path="/xavfsiz-internet" element={<StageModulePage sectionKey="safety" />} />
        <Route path="/ota-onalar" element={<StageModulePage sectionKey="parents" />} />
        <Route path="/oqituvchi" element={<StageModulePage sectionKey="teacher" />} />
        <Route path="/sozlamalar" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
