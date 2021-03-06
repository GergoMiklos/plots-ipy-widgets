#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Gergo Miklos.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget, ValueWidget, register
from traitlets import Unicode
from ._frontend import module_name, module_version

class Widget(DOMWidget, ValueWidget):
    """TODO: Add docstring here
    """
    _model_name = Unicode('WidgetModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('WidgetView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    value = Unicode('Hello World 2').tag(sync=True)
