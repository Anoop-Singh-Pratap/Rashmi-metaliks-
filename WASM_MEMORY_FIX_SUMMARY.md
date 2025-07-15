# WebAssembly Memory Allocation Fix

## Problem Description
The build process was failing with the error:
```
WebAssembly.instantiate(): Out of memory: Cannot allocate Wasm memory for new instance
```

This occurred because Vite/Rollup was trying to inline several large WASM modules (Draco, Rhino3dm, Basis, Ammo, and even esbuild's own .wasm files) at build-time, causing V8 to run out of memory.

## Solution Implemented

### 1. Installed Required Plugin
```bash
npm install --save-dev @rollup/plugin-wasm
```

### 2. Updated vite.config.ts
The configuration now includes:

- **WASM Plugin**: Added `@rollup/plugin-wasm` with `maxFileSize: 0` to always emit WASM files as separate assets
- **Assets Include**: Added `assetsInclude: ['**/*.wasm']` to treat .wasm files as assets
- **Asset Naming**: Configured `assetFileNames: '[name][extname]'` for clean file naming

### 3. Key Changes Made

```typescript
import wasm from "@rollup/plugin-wasm";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      // force _external_ .wasm (never inline)
      wasm({
        // maxFileSize=0 means "always emit as separate asset"
        maxFileSize: 0
      }),
      // ... other plugins
    ],
    // make sure Vite knows to treat .wasm as asset files
    assetsInclude: ['**/*.wasm'],
    build: {
      rollupOptions: {
        output: {
          // name them nicely
          assetFileNames: '[name][extname]'
        }
      }
    }
  };
});
```

## Future WASM Import Handling

If you encounter direct WASM imports in your code later, you'll need to convert them from synchronous bundled imports to asynchronous URL-based imports:

### Before (problematic - bundled and sync-XHR):
```javascript
import DracoModule from 'three/examples/jsm/libs/draco/gltf/draco_wasm_wrapper.js'
```

### After (fixed - emitted as separate file, async-fetch at runtime):
```javascript
import DracoModule from 'three/examples/jsm/libs/draco/gltf/draco_decoder_gltf.js'
import dracoWasmUrl from 'three/examples/jsm/libs/draco/gltf/draco_decoder_gltf.wasm?url'

DracoModule({
  wasmBinary: fetch(dracoWasmUrl).then(res => res.arrayBuffer())
}).then((Module) => {
  // … your loader setup …
})
```

## Benefits of This Solution

1. **Prevents Build-Time Memory Issues**: WASM modules are no longer inlined during build
2. **Faster Build Times**: Less memory pressure on the build process
3. **Runtime Loading**: WASM modules are fetched and instantiated only when needed
4. **Better Caching**: Separate WASM files can be cached independently
5. **Reduced Bundle Size**: Main JavaScript bundle is smaller

## Current Status

✅ **Implemented**: The configuration changes have been applied to `frontend/vite.config.ts`
✅ **Plugin Installed**: `@rollup/plugin-wasm` is now available in devDependencies
✅ **Ready for Build**: The project should now build successfully without WebAssembly memory errors

## Testing the Fix

To verify the fix works:

1. Run the build command:
   ```bash
   cd frontend && npm run build
   ```

2. Check the `dist/` folder for `.wasm` files as separate assets
3. Verify the build completes without memory errors

## Notes

- This solution specifically addresses Three.js WASM modules (Draco, Rhino3dm, Basis, Ammo)
- The fix is backward compatible with existing code
- No changes to component imports are needed unless you have direct WASM imports
- WASM files will now be served as static assets from the `dist/` folder