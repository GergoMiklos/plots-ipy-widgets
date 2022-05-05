// Copyright (c) Gergo Miklos
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';

export class WidgetModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: WidgetModel.model_name,
      _model_module: WidgetModel.model_module,
      _model_module_version: WidgetModel.model_module_version,
      _view_name: WidgetModel.view_name,
      _view_module: WidgetModel.view_module,
      _view_module_version: WidgetModel.view_module_version,
      value: 'Hello World 2',
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'WidgetModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'WidgetView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class WidgetView extends DOMWidgetView {
  private _widgetInput: HTMLInputElement;

  render() {
    this._widgetInput = document.createElement('input');
    this._widgetInput.type = 'email';
    this._widgetInput.value = this.model.get('value');
    this._widgetInput.disabled = this.model.get('disabled');

    this.el.appendChild(this._widgetInput);
    this.el.classList.add('custom-widget');

    // Python -> JavaScript update
    this.model.on('change:value', this._onValueChanged, this);
    this.model.on('change:disabled', this._onDisabledChanged, this);

    // JavaScript -> Python update
    this._widgetInput.onchange = this._onInputChanged.bind(this)
  }

  private _onValueChanged() {
    this._widgetInput.value = this.model.get('value');
  }

  private _onDisabledChanged() {
    this._widgetInput.disabled = this.model.get('disabled');
  }

  private _onInputChanged() {
    this.model.set('value', this._widgetInput.value);
    this.model.save_changes();
  }
}
