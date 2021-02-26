import * as React from 'react';
import { I_TRIGGER_TYPE } from 'src/models/rich';

interface CommonProviderState {
  editorRef: React.RefObject<HTMLDivElement>;
  trigger(type: I_TRIGGER_TYPE, ...opts: any): void;
  register(type: I_TRIGGER_TYPE, comp: React.Component, receiveMessage: Function): void;
  destroy(type: I_TRIGGER_TYPE, comp: React.Component, receiveMessage: Function): void;
}

export default React.createContext({} as CommonProviderState);
