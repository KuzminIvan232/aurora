import UIKit
import React

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = scene as? UIWindowScene,
      let appDelegate = UIApplication.shared.delegate as? AppDelegate,
      let factory = appDelegate.reactNativeFactory
    else {
      return
    }

    let window = UIWindow(windowScene: windowScene)
    self.window = window

    // Scene-based apps don't put the launch URL/user activity into
    // `application(_:didFinishLaunchingWithOptions:)` — UIKit hands it to the
    // scene via `connectionOptions` instead. Without folding it back into the
    // launchOptions we pass to React Native here, `Linking.getInitialURL()`
    // (which reads `bridge.launchOptions[UIApplicationLaunchOptionsURLKey]`)
    // always resolves nil on a cold start via deep link.
    var launchOptions = appDelegate.launchOptions ?? [:]

    if let url = connectionOptions.urlContexts.first?.url {
      launchOptions[UIApplication.LaunchOptionsKey.url] = url
    } else if let userActivity = connectionOptions.userActivities.first(where: {
      $0.activityType == NSUserActivityTypeBrowsingWeb
    }) {
      launchOptions[UIApplication.LaunchOptionsKey.userActivityDictionary] = [
        UIApplication.LaunchOptionsKey.userActivityType: NSUserActivityTypeBrowsingWeb,
        "UIApplicationLaunchOptionsUserActivityKey": userActivity,
      ]
    }

    factory.startReactNative(
      withModuleName: "aurora",
      in: window,
      launchOptions: launchOptions
    )
  }

  // Called when the app is already running (foreground or background) and a
  // new custom-scheme URL comes in — feeds react-native's `Linking`
  // "url" event, which is what `NavigationContainer`'s `linking.subscribe`
  // listens to.
  func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let url = URLContexts.first?.url else { return }
    RCTLinkingManager.application(UIApplication.shared, open: url, options: [:])
  }

  // Same as above, but for Universal Links (delivered as an NSUserActivity
  // rather than a URL context) once Associated Domains are configured.
  func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    RCTLinkingManager.application(
      UIApplication.shared,
      continue: userActivity,
      restorationHandler: { _ in }
    )
  }
}
