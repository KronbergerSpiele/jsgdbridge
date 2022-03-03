export default JSGDHost;
/** @typedef {{ playerName: string, prefix: string, canvasResizePolicy?:0|1|2, reportScore(score:number):void }} JSGDHostProps */
/** @type{ import('react').FC<JSGDHostProps> } */
export const JSGDHost: React.FC<{
    playerName: string;
    prefix: string;
    canvasResizePolicy?: 0 | 1 | 2 | undefined;
    reportScore(score: number): void;
}>;
