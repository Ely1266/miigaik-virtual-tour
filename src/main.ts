import 'pannellum/build/pannellum.css';
import 'pannellum';
import './style.css';

import type { HotSpotData, ScenesConfig, PannellumViewerInstance } from './types';
import { loadScenesConfig, buildPannellumTourConfig } from './tourData';

let viewer: PannellumViewerInstance | null = null;
let currentConfig: ScenesConfig | null = null;

const locationTitleEl = document.getElementById('location-title') as HTMLElement;
const locationFloorEl = document.getElementById('location-floor') as HTMLElement;
const scenesDrawerEl = document.getElementById('scenes-drawer') as HTMLElement;
const scenesListEl = document.getElementById('scenes-list') as HTMLElement;
const btnToggleDrawer = document.getElementById('btn-toggle-drawer') as HTMLButtonElement;
const btnCloseDrawer = document.getElementById('btn-close-drawer') as HTMLButtonElement;

// Элементы модального окна для инфо-точек
const infoModalEl = document.getElementById('info-modal') as HTMLElement;
const infoModalTitleEl = document.getElementById('info-modal-title') as HTMLElement;
const infoModalBodyEl = document.getElementById('info-modal-body') as HTMLElement;
const btnCloseModal = document.getElementById('btn-close-modal') as HTMLButtonElement;

/**
 * Открытие модального окна с описанием объекта
 */
function showInfoModal(spot: HotSpotData): void {
  if (!infoModalEl) return;
  infoModalTitleEl.textContent = spot.infoTitle || spot.text || 'Информация';
  infoModalBodyEl.textContent = spot.infoBody || '';
  infoModalEl.classList.add('open');
}

/**
 * Закрытие модального окна
 */
function hideInfoModal(): void {
  if (!infoModalEl) return;
  infoModalEl.classList.remove('open');
}

/**
 * Обновление UI заголовка и активного элемента в меню при смене сцены
 */
function onSceneChange(sceneId: string): void {
  if (!currentConfig) return;

  const scene = currentConfig.scenes[sceneId];
  if (!scene) return;

  const floor = currentConfig.floors.find((f) => f.id === scene.floorId);
  const floorName = floor ? floor.name : '';

  if (locationTitleEl) {
    locationTitleEl.textContent = scene.title;
  }
  if (locationFloorEl) {
    locationFloorEl.textContent = floorName ? `Локация кампуса • ${floorName}` : 'Локация кампуса';
  }

  // Обновляем выделение в боковом меню
  const items = document.querySelectorAll<HTMLElement>('.scene-item');
  items.forEach((item) => {
    if (item.dataset.sceneId === sceneId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

/**
 * Рендеринг списка сцен в боковом меню
 */
function renderScenesDrawer(config: ScenesConfig): void {
  if (!scenesListEl) return;
  scenesListEl.innerHTML = '';

  const floorMap = new Map<string, string>();
  for (const f of config.floors) {
    floorMap.set(f.id, f.name);
  }

  for (const [id, scene] of Object.entries(config.scenes)) {
    const item = document.createElement('div');
    item.className = 'scene-item';
    item.dataset.sceneId = id;

    const titleDiv = document.createElement('div');
    titleDiv.className = 'scene-item-title';
    titleDiv.textContent = scene.title;

    const floorDiv = document.createElement('div');
    floorDiv.className = 'scene-item-floor';
    floorDiv.textContent = floorMap.get(scene.floorId) || '';

    item.appendChild(titleDiv);
    item.appendChild(floorDiv);

    item.addEventListener('click', () => {
      if (viewer) {
        viewer.loadScene(id);
        scenesDrawerEl.classList.remove('open');
      }
    });

    scenesListEl.appendChild(item);
  }
}

/**
 * Инициализация приложения
 */
async function initApp(): Promise<void> {
  try {
    const dataUrl = `${import.meta.env.BASE_URL}data/scenes.json`;
    const config = await loadScenesConfig(dataUrl);
    currentConfig = config;

    const isDev = import.meta.env.DEV;
    const tourConfig = buildPannellumTourConfig(config, isDev, (spot) => {
      showInfoModal(spot);
    });

    renderScenesDrawer(config);

    // Инициализация просмотрщика Pannellum
    viewer = window.pannellum.viewer('panorama', tourConfig);

    viewer.on('load', () => {
      if (viewer) {
        const activeSceneId = viewer.getScene();
        if (activeSceneId) {
          onSceneChange(activeSceneId);
        }
      }
    });

    // Обработчики открытия/закрытия бокового меню
    btnToggleDrawer?.addEventListener('click', () => {
      scenesDrawerEl?.classList.toggle('open');
    });

    btnCloseDrawer?.addEventListener('click', () => {
      scenesDrawerEl?.classList.remove('open');
    });

    btnCloseModal?.addEventListener('click', hideInfoModal);
    infoModalEl?.addEventListener('click', (e) => {
      if (e.target === infoModalEl) {
        hideInfoModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        scenesDrawerEl?.classList.remove('open');
        hideInfoModal();
      }
    });

    // Первоначальное отображение названия первой сцены
    onSceneChange(config.defaultScene);
  } catch (error) {
    console.error('Ошибка инициализации виртуального тура:', error);
    if (locationTitleEl) {
      locationTitleEl.textContent = 'Ошибка загрузки виртуального тура';
    }
  }
}

// Запуск приложения после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
