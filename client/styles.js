/* Style Loader
 *
 * Anything imported in here will either be added to the vendor CSS chunk, or
 * the main app CSS chunk. Where they will go depends on its location or its
 * extension.
 *
 * Files will be added to the vendor.css chunk if:
 * - they are located inside `node_modules`, or
 * - they are plain .css files.
 * Otherwise, files will be added to the main app.css chunk.
 */

// Pre-built Semantic-UI css. If you want to customize this, you can build your
// own distribution of it and include it here.
// See https: *semantic-ui.com/introduction/build-tools.html
import 'semantic-ui-css/semantic.min.css';

// Include initial base styles.
import '@css/base/index.scss';
