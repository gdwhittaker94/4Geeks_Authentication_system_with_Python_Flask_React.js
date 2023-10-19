from flask import jsonify, url_for

class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "' style='color: white'>" + y + "</a></li>" for y in links])
    return """
        <body style="background: black">
        <div style="text-align: center;">
        <img src="https://wallpapers.com/images/featured/cute-dog-brtwwfga72pilv0j.jpg" style="height:200px; width: 300px; border-radius: 5px; margin-top: 20px">
        <h1 style="color: white">MY API</h1>
        <p style="color: white">API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p style="color: white">Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank" style="color: white">Quick Start</a></p>
        <p style="color: white">Remember to specify a real endpoint path like: </p>
        <ul style="text-align: center; list-style-type: none; color: white; padding: 0">"""+links_html+"</ul></div>"
