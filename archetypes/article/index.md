{{- $path := (path.Dir .File.Path) -}}
{{- $parent := (path.Dir (path.Dir .File.Path)) -}}
{{- $menu_name := (strings.TrimSuffix "/" (path.Dir (.Site.GetPage .File.Path).FirstSection.File.Path)) -}}
---
title: "Título del artículo"
type: docs
menu:
    {{ $menu_name }}:
        identifier: "{{ replace $path "/" "-" }}"
        parent: "{{ replace $parent "/" "-" }}"
weight: 999 # El menú lateral ordena artículos por su peso
---