import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
const domino = require('domino');
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/shop/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const win = domino.createWindow(indexHtml);
  // @ts-ignore
  global['window'] = {
    applicationCache: undefined,
    atob(data: string): string {
      return '';
    },
    btoa(data: string): string {
      return '';
    },
    caches: undefined,
    cancelAnimationFrame(handle: number): void {
    },

    clientInformation: undefined,
    closed: false,
    confirm(message: string | undefined): boolean {
      return false;
    },
    crypto: undefined,
    customElements: undefined,
    defaultStatus: '',
    departFocus(navigationReason: NavigationReason, origin: FocusNavigationOrigin): void {
    },
    devicePixelRatio: 0,
    dispatchEvent(event: Event): boolean {
      return false;
    },
    doNotTrack: '',
    document: undefined,
    event: undefined,
    external: undefined,
    fetch(input: RequestInfo, init: RequestInit | undefined): Promise<Response> {
      return Promise.resolve(undefined);
    },
    frameElement: undefined,
    frames: undefined,
    getComputedStyle(elt: Element, pseudoElt: string | null | undefined): CSSStyleDeclaration {
      return undefined;
    },
    getMatchedCSSRules(elt: Element, pseudoElt: string | null | undefined): CSSRuleList {
      return undefined;
    },
    getSelection(): Selection | null {
      return undefined;
    },
    history: undefined,
    indexedDB: undefined,
    innerHeight: 0,
    innerWidth: 0,
    isSecureContext: false,
    length: 0,
    localStorage: undefined,
    location: undefined,
    locationbar: undefined,
    matchMedia(query: string): MediaQueryList {
      return undefined;
    },
    menubar: undefined,
    moveBy(x: number, y: number): void {
    },
    moveTo(x: number, y: number): void {
    },
    msContentScript: undefined,
    msWriteProfilerMark(profilerMarkName: string): void {
    },
    name: '',
    navigator: undefined,
    offscreenBuffering: undefined,
    onabort: undefined,
    onafterprint: undefined,
    onanimationcancel: undefined,
    onanimationend: undefined,
    onanimationiteration: undefined,
    onanimationstart: undefined,
    onauxclick: undefined,
    onbeforeprint: undefined,
    onbeforeunload: undefined,
    onblur: undefined,
    oncancel: undefined,
    oncanplay: undefined,
    oncanplaythrough: undefined,
    onchange: undefined,
    onclick: undefined,
    onclose: undefined,
    oncompassneedscalibration: undefined,
    oncontextmenu: undefined,
    oncuechange: undefined,
    ondblclick: undefined,
    ondevicelight: undefined,
    ondevicemotion: undefined,
    ondeviceorientation: undefined,
    ondeviceorientationabsolute: undefined,
    ondrag: undefined,
    ondragend: undefined,
    ondragenter: undefined,
    ondragexit: undefined,
    ondragleave: undefined,
    ondragover: undefined,
    ondragstart: undefined,
    ondrop: undefined,
    ondurationchange: undefined,
    onemptied: undefined,
    onended: undefined,
    onerror: undefined,
    onfocus: undefined,
    ongotpointercapture: undefined,
    onhashchange: undefined,
    oninput: undefined,
    oninvalid: undefined,
    onkeydown: undefined,
    onkeypress: undefined,
    onkeyup: undefined,
    onlanguagechange: undefined,
    onload: undefined,
    onloadeddata: undefined,
    onloadedmetadata: undefined,
    onloadstart: undefined,
    onlostpointercapture: undefined,
    onmessage: undefined,
    onmessageerror: undefined,
    onmousedown: undefined,
    onmouseenter: undefined,
    onmouseleave: undefined,
    onmousemove: undefined,
    onmouseout: undefined,
    onmouseover: undefined,
    onmouseup: undefined,
    onmousewheel: undefined,
    onmsgesturechange: undefined,
    onmsgesturedoubletap: undefined,
    onmsgestureend: undefined,
    onmsgesturehold: undefined,
    onmsgesturestart: undefined,
    onmsgesturetap: undefined,
    onmsinertiastart: undefined,
    onmspointercancel: undefined,
    onmspointerdown: undefined,
    onmspointerenter: undefined,
    onmspointerleave: undefined,
    onmspointermove: undefined,
    onmspointerout: undefined,
    onmspointerover: undefined,
    onmspointerup: undefined,
    onoffline: undefined,
    ononline: undefined,
    onorientationchange: undefined,
    onpagehide: undefined,
    onpageshow: undefined,
    onpause: undefined,
    onplay: undefined,
    onplaying: undefined,
    onpointercancel: undefined,
    onpointerdown: undefined,
    onpointerenter: undefined,
    onpointerleave: undefined,
    onpointermove: undefined,
    onpointerout: undefined,
    onpointerover: undefined,
    onpointerup: undefined,
    onpopstate: undefined,
    onprogress: undefined,
    onratechange: undefined,
    onreadystatechange: undefined,
    onrejectionhandled: undefined,
    onreset: undefined,
    onresize: undefined,
    onscroll: undefined,
    onsecuritypolicyviolation: undefined,
    onseeked: undefined,
    onseeking: undefined,
    onselect: undefined,
    onselectionchange: undefined,
    onselectstart: undefined,
    onstalled: undefined,
    onstorage: undefined,
    onsubmit: undefined,
    onsuspend: undefined,
    ontimeupdate: undefined,
    ontoggle: undefined,
    ontouchcancel: undefined,
    ontouchend: undefined,
    ontouchmove: undefined,
    ontouchstart: undefined,
    ontransitioncancel: undefined,
    ontransitionend: undefined,
    ontransitionrun: undefined,
    ontransitionstart: undefined,
    onunhandledrejection: undefined,
    onunload: undefined,
    onvolumechange: undefined,
    onvrdisplayactivate: undefined,
    onvrdisplayblur: undefined,
    onvrdisplayconnect: undefined,
    onvrdisplaydeactivate: undefined,
    onvrdisplaydisconnect: undefined,
    onvrdisplayfocus: undefined,
    onvrdisplaypointerrestricted: undefined,
    onvrdisplaypointerunrestricted: undefined,
    onvrdisplaypresentchange: undefined,
    onwaiting: undefined,
    onwheel: undefined,
    open(url: string | undefined, target: string | undefined, features: string | undefined, replace: boolean | undefined): Window | null {
      return undefined;
    },
    opener: undefined,
    orientation: undefined,
    origin: '',
    outerHeight: 0,
    outerWidth: 0,
    pageXOffset: 0,
    pageYOffset: 0,
    parent: undefined,
    performance: undefined,
    personalbar: undefined,
    postMessage(message: any, targetOrigin: string, transfer: Transferable[] | undefined): void {
    },
    prompt(message: string | undefined, _default: string | undefined): string | null {
      return undefined;
    },
    queueMicrotask(callback: VoidFunction): void {
    },
    requestAnimationFrame(callback: FrameRequestCallback): number {
      return 0;
    },
    resizeBy(x: number, y: number): void {
    },
    resizeTo(width: number, height: number): void {
    },
    screen: undefined,
    screenLeft: 0,
    screenTop: 0,
    screenX: 0,
    screenY: 0,
    scrollX: 0,
    scrollY: 0,
    scrollbars: undefined,
    self: undefined,
    sessionStorage: undefined,

    speechSynthesis: undefined,
    status: '',
    statusbar: undefined,
    styleMedia: undefined,
    toolbar: undefined,
    top: undefined,
    visualViewport: undefined,
    webkitCancelAnimationFrame(handle: number): void {
    },
    webkitConvertPointFromNodeToPage(node: Node, pt: WebKitPoint): WebKitPoint {
      return undefined;
    },
    webkitConvertPointFromPageToNode(node: Node, pt: WebKitPoint): WebKitPoint {
      return undefined;
    },
    webkitRequestAnimationFrame(callback: FrameRequestCallback): number {
      return 0;
    },
    window: undefined,
    addEventListener(type, listener, options?: boolean | AddEventListenerOptions): void {
    },
    alert(message?: any): void {
    },
    blur(): void {
    },
    captureEvents(): void {
    },
    close(): void {
    },

    focus(): void {
    },
    print(): void {
    },
    releaseEvents(): void {
    },
    removeEventListener(type, listener, options?: boolean | EventListenerOptions): void {
    },
    scroll(x?: number | ScrollToOptions, y?: number): void {
    },
    scrollBy(options?: ScrollToOptions | number, y?: number): void {
    },
    scrollTo(x?: number | ScrollToOptions, y?: number): void {
    },
    stop(): void {
    }

  }
  global['document'] = {
    ATTRIBUTE_NODE: 0,
    CDATA_SECTION_NODE: 0,
    COMMENT_NODE: 0,
    DOCUMENT_FRAGMENT_NODE: 0,
    DOCUMENT_NODE: 0,
    DOCUMENT_POSITION_CONTAINED_BY: 0,
    DOCUMENT_POSITION_CONTAINS: 0,
    DOCUMENT_POSITION_DISCONNECTED: 0,
    DOCUMENT_POSITION_FOLLOWING: 0,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 0,
    DOCUMENT_POSITION_PRECEDING: 0,
    DOCUMENT_TYPE_NODE: 0,
    ELEMENT_NODE: 0,
    ENTITY_NODE: 0,
    ENTITY_REFERENCE_NODE: 0,
    NOTATION_NODE: 0,
    PROCESSING_INSTRUCTION_NODE: 0,
    TEXT_NODE: 0,
    URL: '',
    activeElement: undefined,
    adoptNode<T>(source: T): T {
      return undefined;
    },
    alinkColor: '',
    all: undefined,
    anchors: undefined,
    append(nodes: Node | string): void {
    },
    appendChild<T>(newChild: T): T {
      return undefined;
    },
    applets: undefined,
    baseURI: '',
    bgColor: '',
    body: undefined,
    characterSet: '',
    charset: '',
    childElementCount: 0,
    childNodes: undefined,
    children: undefined,
    cloneNode(deep: boolean | undefined): Node {
      return undefined;
    },
    compareDocumentPosition(other: Node): number {
      return 0;
    },
    compatMode: '',
    contains(other: Node | null): boolean {
      return false;
    },
    contentType: '',
    cookie: '',
    createAttribute(localName: string): Attr {
      return undefined;
    },
    createAttributeNS(namespace: string | null, qualifiedName: string): Attr {
      return undefined;
    },
    createCDATASection(data: string): CDATASection {
      return undefined;
    },
    createComment(data: string): Comment {
      return undefined;
    },
    createDocumentFragment(): DocumentFragment {
      return undefined;
    },
    createExpression(expression: string, resolver: XPathNSResolver | null | undefined): XPathExpression {
      return undefined;
    },
    createNSResolver(nodeResolver: Node): XPathNSResolver {
      return undefined;
    },
    createNodeIterator(root: Node, whatToShow: number | undefined, filter: NodeFilter | null | undefined): NodeIterator {
      return undefined;
    },
    createProcessingInstruction(target: string, data: string): ProcessingInstruction {
      return undefined;
    },
    createRange(): Range {
      return undefined;
    },
    createTextNode(data: string): Text {
      return undefined;
    },
    currentScript: undefined,
    defaultView: undefined,
    designMode: '',
    dir: '',
    dispatchEvent(event: Event): boolean {
      return false;
    },
    doctype: undefined,
    documentElement: undefined,
    documentURI: '',
    domain: '',
    embeds: undefined,
    // tslint:disable-next-line:max-line-length
    evaluate(expression: string, contextNode: Node, resolver: XPathNSResolver | null | undefined, type: number | undefined, result: XPathResult | null | undefined): XPathResult {
      return undefined;
    },
    execCommand(commandId: string, showUI: boolean | undefined, value: string | undefined): boolean {
      return false;
    },
    exitFullscreen(): Promise<void> {
      return Promise.resolve(undefined);
    },
    fgColor: '',
    firstChild: undefined,
    firstElementChild: undefined,
    forms: undefined,
    fullscreen: false,
    fullscreenElement: undefined,
    fullscreenEnabled: false,
    getAnimations(): Animation[] {
      return [];
    },
    getElementsByClassName(classNames: string): HTMLCollectionOf<Element> {
      return undefined;
    },
    getElementsByName(elementName: string): NodeListOf<HTMLElement> {
      return undefined;
    },
    getRootNode(options: GetRootNodeOptions | undefined): Node {
      return undefined;
    },
    hasChildNodes(): boolean {
      return false;
    },
    hasFocus(): boolean {
      return false;
    },
    head: undefined,
    hidden: false,
    images: undefined,
    implementation: undefined,
    importNode<T>(importedNode: T, deep: boolean): T {
      return undefined;
    },
    inputEncoding: '',
    insertBefore<T>(newChild: T, refChild: Node | null): T {
      return undefined;
    },
    isConnected: false,
    isDefaultNamespace(namespace: string | null): boolean {
      return false;
    },
    isEqualNode(otherNode: Node | null): boolean {
      return false;
    },
    isSameNode(otherNode: Node | null): boolean {
      return false;
    },
    lastChild: undefined,
    lastElementChild: undefined,
    lastModified: '',
    linkColor: '',
    links: undefined,
    location: undefined,
    lookupNamespaceURI(prefix: string | null): string | null {
      return undefined;
    },
    lookupPrefix(namespace: string | null): string | null {
      return undefined;
    },
    namespaceURI: undefined,
    nextSibling: undefined,
    nodeName: '',
    nodeType: 0,
    nodeValue: undefined,
    onabort: undefined,
    onanimationcancel: undefined,
    onanimationend: undefined,
    onanimationiteration: undefined,
    onanimationstart: undefined,
    onauxclick: undefined,
    onblur: undefined,
    oncancel: undefined,
    oncanplay: undefined,
    oncanplaythrough: undefined,
    onchange: undefined,
    onclick: undefined,
    onclose: undefined,
    oncontextmenu: undefined,
    oncopy: undefined,
    oncuechange: undefined,
    oncut: undefined,
    ondblclick: undefined,
    ondrag: undefined,
    ondragend: undefined,
    ondragenter: undefined,
    ondragexit: undefined,
    ondragleave: undefined,
    ondragover: undefined,
    ondragstart: undefined,
    ondrop: undefined,
    ondurationchange: undefined,
    onemptied: undefined,
    onended: undefined,
    onerror: undefined,
    onfocus: undefined,
    onfullscreenchange: undefined,
    onfullscreenerror: undefined,
    ongotpointercapture: undefined,
    oninput: undefined,
    oninvalid: undefined,
    onkeydown: undefined,
    onkeypress: undefined,
    onkeyup: undefined,
    onload: undefined,
    onloadeddata: undefined,
    onloadedmetadata: undefined,
    onloadstart: undefined,
    onlostpointercapture: undefined,
    onmousedown: undefined,
    onmouseenter: undefined,
    onmouseleave: undefined,
    onmousemove: undefined,
    onmouseout: undefined,
    onmouseover: undefined,
    onmouseup: undefined,
    onpaste: undefined,
    onpause: undefined,
    onplay: undefined,
    onplaying: undefined,
    onpointercancel: undefined,
    onpointerdown: undefined,
    onpointerenter: undefined,
    onpointerleave: undefined,
    onpointerlockchange: undefined,
    onpointerlockerror: undefined,
    onpointermove: undefined,
    onpointerout: undefined,
    onpointerover: undefined,
    onpointerup: undefined,
    onprogress: undefined,
    onratechange: undefined,
    onreadystatechange: undefined,
    onreset: undefined,
    onresize: undefined,
    onscroll: undefined,
    onsecuritypolicyviolation: undefined,
    onseeked: undefined,
    onseeking: undefined,
    onselect: undefined,
    onselectionchange: undefined,
    onselectstart: undefined,
    onstalled: undefined,
    onsubmit: undefined,
    onsuspend: undefined,
    ontimeupdate: undefined,
    ontoggle: undefined,
    ontouchcancel: undefined,
    ontouchend: undefined,
    ontouchmove: undefined,
    ontouchstart: undefined,
    ontransitioncancel: undefined,
    ontransitionend: undefined,
    ontransitionrun: undefined,
    ontransitionstart: undefined,
    onvisibilitychange: undefined,
    onvolumechange: undefined,
    onwaiting: undefined,
    onwheel: undefined,
    open(url: string | undefined, name: string | undefined, features: string | undefined, replace: boolean | undefined): Document {
      return undefined;
    },
    ownerDocument: null,
    parentElement: undefined,
    parentNode: undefined,
    plugins: undefined,
    pointerLockElement: undefined,
    prepend(nodes: Node | string): void {
    },
    previousSibling: undefined,
    queryCommandEnabled(commandId: string): boolean {
      return false;
    },
    queryCommandIndeterm(commandId: string): boolean {
      return false;
    },
    queryCommandState(commandId: string): boolean {
      return false;
    },
    queryCommandSupported(commandId: string): boolean {
      return false;
    },
    queryCommandValue(commandId: string): string {
      return '';
    },
    readyState: undefined,
    referrer: '',
    removeChild<T>(oldChild: T): T {
      return undefined;
    },
    replaceChild<T>(newChild: Node, oldChild: T): T {
      return undefined;
    },
    scripts: undefined,
    scrollingElement: undefined,
    styleSheets: undefined,
    textContent: undefined,
    timeline: undefined,
    title: '',
    visibilityState: undefined,
    vlinkColor: '',
    write(text: string): void {
    },
    writeln(text: string): void {
    },
    addEventListener(type, listener, options?: boolean | AddEventListenerOptions): void {
    },
    captureEvents(): void {
    },
    caretPositionFromPoint(x: number, y: number): CaretPosition | null {
      return undefined;
    },
    caretRangeFromPoint(x: number, y: number): Range {
      return undefined;
    },
    clear(): void {
    },
    close(): void {
    },
    createElement(tagName, options?: ElementCreationOptions): any {
    },
    // tslint:disable-next-line:max-line-length
    createElementNS(namespaceURI: 'http://www.w3.org/2000/svg' | string | null | 'http://www.w3.org/1999/xhtml', qualifiedName, options?: ElementCreationOptions | string): any {
    },
    createEvent(eventInterface: 'PageTransitionEvent' | 'VRDisplayEvent ' | 'RTCSsrcConflictEvent' | 'ServiceWorkerMessageEvent' | 'ClipboardEvent' | 'PermissionRequestedEvent' | 'RTCIceCandidatePairChangedEvent' | 'Events' | 'StorageEvent' | 'PaymentRequestUpdateEvent' | 'OfflineAudioCompletionEvent' | 'TransitionEvent' | 'MediaStreamTrackEvent' | 'VRDisplayEvent' | 'ListeningStateChangedEvent' | 'ProgressEvent' | 'PointerEvent' | 'OverflowEvent' | 'MessageEvent' | 'CloseEvent' | 'MutationEvents' | 'DeviceMotionEvent' | 'FocusEvent' | 'ErrorEvent' | 'PopStateEvent' | 'AudioProcessingEvent' | 'UIEvent' | 'DragEvent' | 'HashChangeEvent' | 'AnimationEvent' | 'MutationEvent' | 'RTCDtlsTransportStateChangedEvent' | 'SpeechSynthesisErrorEvent' | 'RTCIceTransportStateChangedEvent' | 'RTCDataChannelEvent' | 'RTCErrorEvent' | 'MediaStreamErrorEvent' | 'KeyboardEvent' | 'TrackEvent' | 'CustomEvent' | 'MSMediaKeyMessageEvent' | 'RTCPeerConnectionIceEvent' | 'RTCDTMFToneChangeEvent' | 'RTCTrackEvent' | 'MediaKeyMessageEvent' | 'PromiseRejectionEvent' | 'MediaEncryptedEvent' | 'FocusNavigationEvent' | string | 'WheelEvent' | 'DeviceLightEvent' | 'GamepadEvent' | 'SVGZoomEvents' | 'Event' | 'IDBVersionChangeEvent' | 'MSPointerEvent' | 'BeforeUnloadEvent' | 'MouseEvents' | 'SpeechRecognitionEvent' | 'InputEvent' | 'RTCStatsEvent' | 'UIEvents' | 'SVGZoomEvent' | 'MediaStreamEvent' | 'RTCIceGathererEvent' | 'MSMediaKeyNeededEvent' | 'RTCPeerConnectionIceErrorEvent' | 'TouchEvent' | 'CompositionEvent' | 'AnimationPlaybackEvent' | 'SpeechSynthesisEvent' | 'TextEvent' | 'MediaQueryListEvent' | 'WebGLContextEvent' | 'SecurityPolicyViolationEvent' | 'MSGestureEvent' | 'DeviceOrientationEvent' | 'MouseEvent'): any {
    },
    createTreeWalker(root: Node, whatToShow?: number, filter?: NodeFilter | null, entityReferenceExpansion?: boolean): TreeWalker {
      return undefined;
    },
    elementFromPoint(x: number, y: number): Element | null {
      return undefined;
    },
    elementsFromPoint(x: number, y: number): Element[] {
      return [];
    },
    exitPointerLock(): void {
    },
    getElementById(elementId: string): any {
    },
    getElementsByTagName(qualifiedName): any {
    },
    getElementsByTagNameNS(namespaceURI: 'http://www.w3.org/1999/xhtml' | 'http://www.w3.org/2000/svg' | string, localName: string): any {
    },
    getSelection(): Selection | null {
      return undefined;
    },
    normalize(): void {
    },
    querySelector(selectors): any {
    },
    querySelectorAll(selectors): any {
    },
    releaseEvents(): void {
    },
    removeEventListener(type, listener, options?: boolean | EventListenerOptions): void {
    }

  };
  // global['navigator'] = mock.getNavigator();

  global['Node'] = win.Node;
  global['Text'] = win.Text;
  global['HTMLElement'] = win.HTMLElement;
  global['navigator'] = win.navigator;
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
