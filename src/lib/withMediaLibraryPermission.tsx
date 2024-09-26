import * as MediaLibrary from "expo-media-library";
import { type PropsWithChildren, useEffect } from "react";
import React from "react";

interface WithMediaLibraryPermissionProps {
  fallback?: JSX.Element;
}

/**
 * Higher-order component to wrap a component with media library permission handling.
 *
 * @template P - Props of the wrapped component.
 * @param {React.ComponentType<P>} WrappedComponent - The component to wrap.
 * @returns {React.FC<PropsWithChildren<P & WithMediaLibraryPermissionProps>>} - The wrapped component with permission handling.
 */
export function withMediaLibraryPermission<P>(WrappedComponent: React.ComponentType<P>) {
  return function WithMediaLibraryPermission(
    props: PropsWithChildren<P & WithMediaLibraryPermissionProps>,
  ) {
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    useEffect(() => {
      if (permissionResponse?.status !== "granted") {
        requestPermission();
      }
    }, [permissionResponse, requestPermission]);

    if (!permissionResponse) {
      return null;
    }

    if (permissionResponse.status !== "granted") {
      return props.fallback || null;
    }

    return <WrappedComponent {...(props as P & JSX.IntrinsicAttributes)} />;
  };
}
