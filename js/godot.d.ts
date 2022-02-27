export = Godot;
declare function Godot(Godot: any): any;
declare namespace Godot {
    export { Godot, EngineConfig };
}
/**
 * An object used to configure the Engine instance based on godot export options, and to override those in custom HTML
 * templates if needed.
 */
type EngineConfig = Object;
