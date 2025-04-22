# VSD README

VSD is a Visual Studio Code extension that provides a simple way to view and manage PHP dump output.
It relies on the symfony/var-dumper component to format the output and provides a user-friendly interface for viewing and managing the dump data right in your editor.
It uses a custom dump named vsd that brings along some extra context like headers, request and response data, and the current file and line number where the dump was called.

## Features

* **View dump output**: The extension provides a simple way to view dump output in a separate panel, making it easy to manage and analyze the data.
* **Custom dump format**: The extension uses a custom dump format that includes extra context like headers, request and response data, and the current file and line number where the dump was called.
* **Easy to use**: The extension is easy to use and requires no additional configuration. Simply install the extension and start using it right away.
* **Colortheme support**: The extension supports the current colortheme of your editor, making it easy to integrate into your workflow.

---

![Screenshot of VSD extension in action](images/screen1.png)

---

## Running

* Ctrl-shift-p and type `VSD: Start PHP-dump-server`


## Requirements

* PHP 7.1 or higher
* The VSD-php package, https://github.com/hugoup/vsd-php
* if running inside a docker container, make sure to add "host.docker.internal:host-gateway" to your extra_hosts

## Known Issues

none.

## Release Notes

#### 0.0.5
Complete refactor

#### 0.0.3
Reference to library 

#### 0.0.2
Add icon

#### 0.0.1
Initial release of vsd



