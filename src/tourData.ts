import type {
  ScenesConfig,
  PannellumTourConfig,
  PannellumScene,
  PannellumHotSpot,
  HotSpotData
} from './types';

/**
 * Загружает конфигурационный файл сцен виртуального тура.
 */
export async function loadScenesConfig(url: string = '/data/scenes.json'): Promise<ScenesConfig> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки конфигурации сцен (${url}): ${response.status} ${response.statusText}`);
  }
  const data: ScenesConfig = await response.json();
  return data;
}

/**
 * Преобразует конфигурацию сцен проекта в формат конфигурации Pannellum Tour.
 * Вынесено в отдельный модуль согласно требованиям архитектуры проекта.
 */
export function buildPannellumTourConfig(
  config: ScenesConfig,
  isDev: boolean = false,
  onInfoClick?: (spot: HotSpotData) => void
): PannellumTourConfig {
  const pannellumScenes: Record<string, PannellumScene> = {};

  for (const [sceneId, scene] of Object.entries(config.scenes)) {
    const hotSpots: PannellumHotSpot[] = [];

    if (scene.hotSpots && Array.isArray(scene.hotSpots)) {
      for (const spot of scene.hotSpots) {
        if (spot.type === 'scene') {
          hotSpots.push({
            pitch: spot.pitch,
            yaw: spot.yaw,
            type: 'scene',
            text: spot.text,
            sceneId: spot.sceneId,
            targetPitch: spot.targetPitch ?? 0,
            targetYaw: spot.targetYaw ?? 0
          });
        } else if (spot.type === 'info') {
          const infoSpot: PannellumHotSpot = {
            pitch: spot.pitch,
            yaw: spot.yaw,
            type: 'info',
            text: spot.text
          };

          if (onInfoClick && (spot.infoTitle || spot.infoBody)) {
            infoSpot.clickHandlerFunc = (_evt: MouseEvent) => {
              onInfoClick(spot);
            };
          }

          hotSpots.push(infoSpot);
        }
      }
    }

    pannellumScenes[sceneId] = {
      title: scene.title,
      type: scene.type,
      panorama: scene.panorama,
      pitch: scene.pitch ?? 0,
      yaw: scene.yaw ?? 0,
      hfov: scene.hfov ?? 100,
      hotSpots
    };
  }

  return {
    default: {
      firstScene: config.defaultScene,
      sceneFadeDuration: 1000,
      autoLoad: true,
      hotSpotDebug: isDev,
      compass: false
    },
    scenes: pannellumScenes
  };
}
