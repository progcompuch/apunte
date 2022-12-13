{{- $path := (path.Dir .File.Path) -}}
{{- $parent := (path.Dir (path.Dir .File.Path)) -}}
{{- $menu_name := (strings.TrimSuffix "/" (path.Dir (.Site.GetPage .File.Path).FirstSection.File.Path)) -}}
---
title: "Título de la sección"
type: docs
menu:
    {{ $menu_name }}:
        identifier: "{{ replace $path "/" "-" }}"
        {{ if (ne $parent $menu_name) -}}
        parent: "{{ replace $parent "/" "-" }}"
        {{- end }}
weight: 999 # Las secciones se ordenan de forma ascendente por su peso
---