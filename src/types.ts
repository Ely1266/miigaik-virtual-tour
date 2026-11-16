/**
 * Описание типов данных для виртуальной экскурсии МИИГАиК.
 * Соответствует структуре docs/data/scenes.schema.json и формату Pannellum.
 */

export interface FloorInfo {
  id: string;
  name: string;
  level: number;
  planImage: string;
}

export interface HotSpotData {
  pitch: number;
  yaw: number;
  type: 'scene' | 'info';
  text: string;
  sceneId?: string;
  targetYaw?: number;
  targetPitch?: number;
  infoTitle?: string;
  infoBody?: string;
  infoImage?: string;
}

export interface FloorPosition {
  x: number;
  y: number;
}

export interface MultiResConfig {
  basePath: string;
  path: string;
  fallbackPath: string;
  extension: string;
  tileResolution: number;
  maxLevel: number;
  cubeResolution: number;
}

export interface SceneData {
  title: string;
  floorId: string;
  yaw?: number;
  pitch?: number;
  hfov?: number;
  type: 'equirectangular' | 'cubemap' | 'multires';
  panorama?: string;
  multiRes?: MultiResConfig;
  floorPosition?: FloorPosition;
  hotSpots?: HotSpotData[];
}

export interface ScenesConfig {
  defaultScene: string;
  floors: FloorInfo[];
  scenes: Record<string, SceneData>;
}

export interface PannellumHotSpot {
  pitch: number;
  yaw: number;
  type: 'scene' | 'info';
  text: string;
  sceneId?: string;
  targetYaw?: number;
  targetPitch?: number;
  clickHandlerFunc?: (evt: MouseEvent, args: unknown) => void;
  clickHandlerArgs?: unknown;
}

export interface PannellumScene {
  title: string;
  hfov?: number;
  pitch?: number;
  yaw?: number;
  type: string;
  panorama?: string;
  multiRes?: MultiResConfig;
  hotSpots?: PannellumHotSpot[];
}

export interface PannellumTourConfig {
  default: {
    firstScene: string;
    sceneFadeDuration: number;
    autoLoad: boolean;
    hotSpotDebug: boolean;
    compass?: boolean;
    northOffset?: number;
  };
  scenes: Record<string, PannellumScene>;
}

declare global {
  interface Window {
    pannellum: {
      viewer: (
        container: string | HTMLElement,
        initialConfig: PannellumTourConfig
      ) => PannellumViewerInstance;
    };
  }
}

export interface PannellumViewerInstance {
  loadScene: (sceneId: string, targetPitch?: number, targetYaw?: number, targetHfov?: number) => void;
  getScene: () => string;
  getPitch: () => number;
  getYaw: () => number;
  getHfov: () => number;
  setPitch: (pitch: number, animated?: boolean | number) => void;
  setYaw: (yaw: number, animated?: boolean | number) => void;
  on: (type: string, listener: (...args: unknown[]) => void) => void;
  off: (type: string, listener: (...args: unknown[]) => void) => void;
  destroy: () => void;
}
