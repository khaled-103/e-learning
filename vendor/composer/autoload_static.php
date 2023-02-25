<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit649f06bda6404fa6e5ef8a41c4ddf62f
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Stripe\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Stripe\\' => 
        array (
            0 => __DIR__ . '/..' . '/stripe/stripe-php/lib',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit649f06bda6404fa6e5ef8a41c4ddf62f::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit649f06bda6404fa6e5ef8a41c4ddf62f::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit649f06bda6404fa6e5ef8a41c4ddf62f::$classMap;

        }, null, ClassLoader::class);
    }
}