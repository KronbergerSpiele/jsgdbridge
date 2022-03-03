export default JSGDHost;
/** @typedef {{ playerName: string, prefix: string, canvasResizePolicy?:0|1|2, reportScore(score:number):void, playerPowerup?:number }} JSGDHostProps */
/** @type{ import('react').FC<JSGDHostProps> } */
export const JSGDHost: React.FC<{
    playerName: string;
    prefix: string;
    canvasResizePolicy?: 0 | 1 | 2 | undefined;
    reportScore(score: number): void;
    playerPowerup?: number | undefined;
}>;
