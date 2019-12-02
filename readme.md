# Configuraciones básicas

## Java
Native Android apps are compiled with the Java programming language. 
Cordova is not compatible with the latest version of Java. You must install JDK8 to build Android apps with Cordova.

Obs: configurar JAVA-HOME y el Path en las variables de entorno

## Android
Installing the Android SDK
The Android SDK can be managed with Android Studio in the Configure » SDK Manager menu of the Android Studio welcome screen or Tools » SDK Manager inside Android projects.
SDK version 28


## Gradle

Gradle is the build tool used in Android apps and must be installed separately. See the install page for details.

Microsoft Windows users
Create a new directory C:\Gradle with File Explorer.

Open a second File Explorer window and go to the directory where the Gradle distribution was downloaded. Double-click the ZIP archive to expose the content. Drag the content folder gradle-6.0.1 to your newly created C:\Gradle folder.

Alternatively you can unpack the Gradle distribution ZIP into C:\Gradle using an archiver tool of your choice.

In File Explorer right-click on the This PC (or Computer) icon, then click Properties -> Advanced System Settings -> Environmental Variables.

Under System Variables select Path, then click Edit. Add an entry for C:\Gradle\gradle-6.0.1\bin. Click OK to save.

Step 4. Verify your installation
Open a console (or a Windows command prompt) and run gradle -v to run gradle and display the version, e.g.:

$ gradle -v
Gradle 6.0.1

## Cordova

Instalar cordova en el proyecto
npm install -g ionic cordova


Agregar la plataforma de android a cordova.
ionic cordova platform add android

En  resources/android/xml/navigation_segurity agregar el dominio de la api 
domain includeSubdomains="true">"ADD-YOUR-DOMAIN>"

una vez conectado un dispositivo correr el proyecto
ionic cordova run android
