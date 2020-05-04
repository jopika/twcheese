/*!---------------------------------------------------------------------
 * Commands Overview - show returning hauls
 * market: uk, us, en, {all}
 * author Nick Toby (cheesasaurus@gmail.com)
 * 
 * use script on: game.php?screen=overview_villages&mode=commands&type=return (the commands overview, with the return filter on)
 * effect: includes 'haul' as part of the information for the listed commands. Also shows statistics about the incoming resources
 *  
 * Copyright (C) 2011  Nick Toby
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see http://www.gnu.org/licenses/
 *---------------------------------------------------------------------
 *
 * Want to fix something?
 * https://github.com/cheesasaurus/twcheese
 *---------------------------------------------------------------------*/
/*!
 * OverviewHauls tool compiled from:
 *     /src/ToolSetup/OverviewHauls.js
 * Sidebar compiled from:
 *     src/ToolSetup/Sidebar.js
 * Vendor libs from:
 *     vendor/
 *---------------------------------------------------------------------*/
(async function() {
    let toolId = 'OverviewHauls';

    if (typeof window.TwCheese === 'undefined') {
        function handleJqXhrError(reject) {
            return function(jqxhr) {
                reject(new Error(`[${jqxhr.status} ${jqxhr.statusText}] ${this.type} ${this.url}`));
            }
        }


        window.TwCheese = {
            ROOT: 'https://jopika.github.io/twcheese',
            version: 'v1.9-21-ga016902',
            tools: {},
            lastToolUsedId: null,

            async loadVendorLibs() {
                return new Promise((resolve, reject) => {
                    $.ajax(`${this.ROOT}/dist/vendor.js`, {
                        complete: resolve,
                        error: handleJqXhrError(reject)
                    });
                });
            },

            async loadVendorLibsMinified(cacheBuster) {
                return new Promise((resolve, reject) => {
                    $.ajax(`${this.ROOT}/dist/vendor.min.js?${cacheBuster}`, {
                        cache: true,
                        complete: resolve,
                        error: handleJqXhrError(reject)
                    });
                });
            },

            async loadTool(toolId) {
                return new Promise((resolve) => {
                    let module = document.createElement('script');
                    module.type = 'module';
                    module.onload = resolve;
                    module.src = `${this.ROOT}/src/ToolSetup/${toolId}.js`;
                    document.head.appendChild(module);
                });
            },

            async loadToolCompiled(toolId, cacheBuster) {
                return new Promise((resolve, reject) => {
                    $.ajax(`${this.ROOT}/dist/tool/setup-only/${toolId}.min.js?${cacheBuster}`, {
                        cache: true,
                        complete: resolve,
                        error: handleJqXhrError(reject)
                    });
                });
            },

            hasTool(toolId) {
                return typeof this.tools[toolId] !== 'undefined';
            },

            registerTool(tool) {
                this.tools[tool.id] = tool;
            },

            useTool(toolId) {
                this.lastToolUsedId = toolId;
                this.tools[toolId].use();
            },

            tryUseTool(toolId) {
                if (!this.hasTool(toolId)) {
                    return false;
                }
                this.useTool(toolId);
                return true;
            },

            newDebugProcess(toolId) {
                if (!this.hasTool(toolId)) {
                    return null;
                }
                return this.tools[toolId].getDebugProcess();
            }

        };


        await TwCheese.loadVendorLibsMinified('a2b0f8e1635207439b95aa79f918de49');
        await TwCheese.loadToolCompiled('Sidebar', '31c65f287e93e810ebb59ed41f6da3e0');
        TwCheese.useTool('Sidebar');
    }

    if (TwCheese.hasTool(toolId)) {
        TwCheese.useTool(toolId);
    } else {
        await TwCheese.loadToolCompiled(toolId, 'd04d7fcd60725a1a8f6aa8d6bd9d89e9');
        TwCheese.useTool(toolId);
    }
})();