__jloader = (() => {
    _instance = null;

    function request(url, body = undefined, method = "GET", headers = {}, withCredentials = false) {
        return new Promise((resolve, reject) => {
            var req = (window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"));

            req.open(method, url, 1);
            Object.keys(headers).forEach((x) => {
                req.setRequestHeader(x, headers[x]);
            });
            req.withCredentials = withCredentials;
            req.onreadystatechange = () => {
                if (req.readyState === XMLHttpRequest.DONE && req.status >= 200 && req.status <= 299) {
                    resolve({status: true, loaded: url, type: "url", request: req});
                } else if (req.readyState === XMLHttpRequest.DONE) {
                    reject({status: false, request: req, message: `invalid response code from ${method} ${url} (code: ${req.status})`});
                }
            }
            req.onerror = () => {
                reject({status: false, message: `unknown error when requesting ${method} ${url}`});
            }
            req.send(body);
        });
    }

    function init()
    {
        const instanceJSONs = {};

        function fetchJSON(url, key = undefined)
        {
            if (key === undefined)
                key = url;

            return new Promise((resolve, reject) => {
                if (instanceJSONs[key]) {
                    resolve({status: true, loaded: url, type: "json", content: instanceJSONs[key]});
                    return;
                }

                request(url).then(data => {
                    instanceJSONs[key] = JSON.parse(data.request.responseText);
                    resolve({status: true, loaded: url, type: "json", content: instanceJSONs[key]});
                }).catch(err => {
                    reject({status: false, message: `Failed to load json ${url}`});
                });
            });
        }
    
        return ({
            get: function (key) {
                return (instanceJSONs[key]);
            },
            fetch: function (url, key = undefined, noCache = false) {
                return new Promise((resolve, reject) => {
                    if (!noCache && instanceJSONs[key] !== undefined)
                        resolve(get(key));
                    fetchJSON(url, key).then((data) => {
                        resolve(data.content);
                    }).catch(err => {
                        reject(err.message);
                    });
                });
            }
        });
    }

    return ({
        getInstance: function () {
            if (_instance === null)
                _instance = init();
            return (_instance);
        }
    });
})();

window.document.JLI = __jloader.getInstance();
