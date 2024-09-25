import React, { PropsWithChildren } from "react";
import { SizeType } from ".";

export interface ConfigContextType {
  space?: {
    size?: SizeType | [SizeType, SizeType];
  }
}

interface ConfigProviderProps extends PropsWithChildren<ConfigContextType>{
}

export function ConfigProvider(props: ConfigProviderProps) {
    const {
      space,
      children
    } = props;
  
    return <ConfigContext.Provider value={{ space }}>{children}</ConfigContext.Provider>
  }

export const ConfigContext = React.createContext<ConfigContextType>({});
