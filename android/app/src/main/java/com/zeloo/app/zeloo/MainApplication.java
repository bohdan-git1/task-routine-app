package com.zeloo.app.zeloo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.github.reactnativecommunity.location.RNLocationPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.calendarevents.CalendarEventsPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.zyu.ReactNativeWheelPickerPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.opensettings.OpenSettingsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.zeloo.app.zeloo.BuildConfig;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BackgroundTimerPackage(),
            new RNI18nPackage(),
            new RNFirebasePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNLocationPackage(),
            new MapsPackage(),
            new AsyncStoragePackage(),
            new ReactNativeContacts(),
            new LocationServicesDialogBoxPackage(),
            new CalendarEventsPackage(),
            new RNFusedLocationPackage(),
            new RNDeviceInfo(),
            new ReactNativeWheelPickerPackage(),
            new RNGooglePlacesPackage(),
            new PickerPackage(),
            new OpenSettingsPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new SnackbarPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
