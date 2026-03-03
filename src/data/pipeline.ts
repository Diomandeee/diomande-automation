// Static data for the iOS Pipeline Showcase page

export interface PipelineStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: string;
  command?: string;
  details: string[];
}

export interface AppEntry {
  name: string;
  bundleId: string;
  testflightStatus: "live" | "pending" | "not-submitted";
  icon?: string;
}

export interface LearnedPattern {
  title: string;
  description: string;
  code?: string;
  category: "icon" | "signing" | "asc" | "build" | "upload";
}

export const pipelineStats = {
  totalApps: 18,
  testflightLive: 4,
  successRate: "100%",
  retries: 0,
};

export const pipelineSteps: PipelineStep[] = [
  {
    id: "icon-gen",
    name: "Icon Generation",
    description: "Generate all required icon sizes from a single 1024x1024 source image",
    icon: "Image",
    duration: "~2s",
    command: "sips -z {size} {size} icon-1024.png --out AppIcon{size}.png",
    details: [
      "Reads 1024x1024 PNG source",
      "Generates 13 sizes (20pt–1024pt) at 1x/2x/3x scales",
      "Writes Contents.json with proper idiom/scale entries",
      "Outputs to Assets.xcassets/AppIcon.appiconset/",
    ],
  },
  {
    id: "export-opts",
    name: "ExportOptions.plist",
    description: "Generate signing config — always destination=export, never upload",
    icon: "FileKey",
    duration: "~1s",
    command: "plutil -create xml1 ExportOptions.plist",
    details: [
      "Sets method=app-store",
      "Sets destination=export (NOT upload — upload hangs on ASC auth failure)",
      "Auto-detects team ID and provisioning profile",
      "Generates per-app or shared plist",
    ],
  },
  {
    id: "bundle-reg",
    name: "Bundle ID Registration",
    description: "Register the bundle identifier via App Store Connect API",
    icon: "Key",
    duration: "~3s",
    command: "POST /v1/bundleIds { identifier, name, platform }",
    details: [
      "Uses ASC API key (GET/UPDATE + bundleId creation)",
      "Registers com.diomande.{app} identifier",
      "Sets platform to IOS",
      "Handles 409 (already exists) gracefully",
    ],
  },
  {
    id: "asc-app",
    name: "ASC App Creation",
    description: "Create app record in App Store Connect via Safari React handler injection",
    icon: "AppWindow",
    duration: "~8s",
    command: "Safari __reactEventHandlers injection",
    details: [
      "API key lacks app creation scope — uses browser automation",
      "Injects into ASC React component tree via __reactEventHandlers",
      "Sets name, bundle ID, SKU, primary language",
      "Never uses cliclick — coordinate math across Retina+external is unreliable",
    ],
  },
  {
    id: "archive",
    name: "Archive Build",
    description: "Build and archive the Xcode project for distribution",
    icon: "Package",
    duration: "~2-5min",
    command: "xcodebuild archive -project {name}.xcodeproj -scheme {scheme} -archivePath build/{name}.xcarchive",
    details: [
      "Adds -skipMacroValidation -skipPackagePluginValidation for TCA projects",
      "Sets CODE_SIGN_IDENTITY and DEVELOPMENT_TEAM",
      "All 4 iPad orientations in UISupportedInterfaceOrientations~ipad",
      "Requires 1024x1024 icon + CFBundleIconName in Info.plist",
    ],
  },
  {
    id: "export-ipa",
    name: "Export IPA",
    description: "Export the archive to a signed IPA file",
    icon: "FileOutput",
    duration: "~30s",
    command: "xcodebuild -exportArchive -archivePath build/{name}.xcarchive -exportPath build/ipa -exportOptionsPlist ExportOptions.plist",
    details: [
      "Reads ExportOptions.plist for signing config",
      "Outputs .ipa to build/ipa/ directory",
      "Validates code signature automatically",
      "Strips debug symbols for release",
    ],
  },
  {
    id: "upload-tf",
    name: "Upload to TestFlight",
    description: "Upload the signed IPA to TestFlight for distribution",
    icon: "Upload",
    duration: "~1-3min",
    command: "xcrun altool --upload-app -f build/ipa/{name}.ipa -t ios --apiKey {key} --apiIssuer {issuer}",
    details: [
      "Uses ASC API key for authentication",
      "Validates app before upload",
      "Auto-detects build number conflicts",
      "Processing takes 5-15min on Apple's side after upload",
    ],
  },
];

export const appEntries: AppEntry[] = [
  { name: "SecuriClaw", bundleId: "com.diomande.SecuriClaw", testflightStatus: "live" },
  { name: "SpeakFlow", bundleId: "com.diomande.SpeakFlow", testflightStatus: "live" },
  { name: "CreativeDirector", bundleId: "com.diomande.CreativeDirector", testflightStatus: "live" },
  { name: "Spore", bundleId: "com.diomande.Spore", testflightStatus: "live" },
  { name: "OpenClaw Hub", bundleId: "com.diomande.OpenClawHub", testflightStatus: "pending" },
  { name: "Aura", bundleId: "com.diomande.Aura", testflightStatus: "pending" },
  { name: "FirstDate", bundleId: "com.diomande.FirstDate", testflightStatus: "pending" },
  { name: "LearnNKo", bundleId: "com.diomande.LearnNKo", testflightStatus: "not-submitted" },
  { name: "LinkIt", bundleId: "com.diomande.LinkIt", testflightStatus: "not-submitted" },
  { name: "Milk Men", bundleId: "com.diomande.MilkMen", testflightStatus: "not-submitted" },
  { name: "Modra", bundleId: "com.diomande.Modra", testflightStatus: "not-submitted" },
  { name: "QR Dynamic", bundleId: "com.diomande.QRDynamic", testflightStatus: "not-submitted" },
  { name: "Serenity Soother", bundleId: "com.diomande.SerenitySoother", testflightStatus: "not-submitted" },
  { name: "BodyBeat", bundleId: "com.diomande.BodyBeat", testflightStatus: "not-submitted" },
  { name: "Cali Lights", bundleId: "com.diomande.CaliLights", testflightStatus: "not-submitted" },
  { name: "Eternal Serenity", bundleId: "com.diomande.EternalSerenity", testflightStatus: "not-submitted" },
  { name: "N'Ko Keyboard AI", bundleId: "com.diomande.NKoKeyboardAI", testflightStatus: "not-submitted" },
  { name: "Watch Whisper", bundleId: "com.diomande.WatchWhisper", testflightStatus: "not-submitted" },
];

export const learnedPatterns: LearnedPattern[] = [
  {
    title: "ExportOptions Destination Trap",
    description: "Always use destination=export, never destination=upload. Upload mode hangs silently when ASC authentication fails, leaving you with a zombie process.",
    code: `<key>destination</key>
<string>export</string>  <!-- NOT upload -->`,
    category: "signing",
  },
  {
    title: "TCA Archive Flags",
    description: "Swift Composable Architecture projects require extra flags to skip macro and package plugin validation during archive builds.",
    code: `xcodebuild archive \\
  -skipMacroValidation \\
  -skipPackagePluginValidation`,
    category: "build",
  },
  {
    title: "iPad Orientation Requirement",
    description: "Even iPhone-only apps must declare ALL 4 orientations in UISupportedInterfaceOrientations~ipad or the archive will be rejected.",
    code: `<key>UISupportedInterfaceOrientations~ipad</key>
<array>
  <string>UIInterfaceOrientationPortrait</string>
  <string>UIInterfaceOrientationPortraitUpsideDown</string>
  <string>UIInterfaceOrientationLandscapeLeft</string>
  <string>UIInterfaceOrientationLandscapeRight</string>
</array>`,
    category: "build",
  },
  {
    title: "TestFlight Icon Requirement",
    description: "Upload will 409 without a 1024x1024 PNG icon AND CFBundleIconName set in Info.plist. Both are required — having just one is not enough.",
    code: `<key>CFBundleIconName</key>
<string>AppIcon</string>`,
    category: "upload",
  },
  {
    title: "ASC React Handler Injection",
    description: "The ASC API key only has GET/UPDATE scope — no app creation. We bypass this by injecting into Safari's React component tree via __reactEventHandlers to automate the ASC web UI.",
    category: "asc",
  },
  {
    title: "Never Use cliclick for ASC",
    description: "Coordinate math across Retina + external displays is unreliable. Use Safari React handler injection instead of screen coordinate clicking for ASC automation.",
    category: "asc",
  },
];
