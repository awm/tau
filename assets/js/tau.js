function tau(params) {
    var lower = params['tau'] * (1.0 - params['tolerance']);
    var upper = params['tau'] * (1.0 + params['tolerance']);
    var results = [];

    for (var r = 0; r < params['resistors'].length; ++r) {
        for (var c = 0; c < params['capacitors'].length; ++c) {
            var R = params['resistors'][r];
            var C = params['capacitors'][c];
            var t = R * C;
            if (lower < t && t < upper) {
                results.push({
                    'R': R,
                    'C': C,
                    'tau': t,
                    'delta': Math.abs(params['tau'] - t),
                });
            }
        }
    }
    return results.sort(function(a, b) {
        return a['delta'] - b['delta'];
    });
}

function dedup(values) {
    values = values.filter(function(current) {
        if (Number.isNaN(current)) {
            return false;
        }
        else {
            return (current in this) ? false : (this[current] = true);
        }
    }, {});
    return values.sort(function(a, b) {
        return a - b;
    });
}

function parse_extras(content) {
    // TODO: some validation
    var entries = content.split(/\s*,\s*/);
    entries = entries.map(function(current) {
        return parseFloat(current);
    });
    return entries;
}

function get_resistors() {
    var tolerance = $('input[name=resistor-tolerance]:checked').val();
    var dmin = parseInt($('#d-min').html());
    var dmax = parseInt($('#d-max').html());
    var N = parseInt($('#n-' + tolerance).html());
    var precision = (N > 24 ? 3 : 2);
    var resistors = parse_extras($('#extra-resistors').val());

    if (tolerance === "1") {
        var cells = $('#resistor-1-fixed-body').find('td');
        resistors = resistors.concat(cells.map(function() {
            return parseFloat($(this).html());
        }));
    }

    for (var d = dmin; d <= dmax; ++d)
    {
        for (var i = 0; i < N; ++i)
        {
            var R = Math.pow(10, d) * Math.pow(10, i / N);
            R = +R.toPrecision(precision);
            resistors.push(R);
        }
    }

    return dedup(resistors);
}

function get_capacitors() {
    var cells = $('#capacitor-body').find('td');
    var capacitors = parse_extras($('#extra-capacitors').val());
    capacitors = $.merge(capacitors, cells.map(function() {
        return parseFloat($(this).html());
    }));

    return dedup(capacitors);
}

function format_resistance(r) {
    if (r < 1000) {
        return r + ' ';
    }
    else if (r < 1e6) {
        return (r / 1e3) + ' k';
    }

    return (r / 1e6) + ' M';
}

function format_capacitance(c) {
    if (c < 0.01e-6) {
        return +(c * 1e12).toPrecision(2) + ' p';
    }

    return +(c * 1e6).toPrecision(2) + ' µ';
}

function format_tau(t) {
    return +t.toPrecision(5) + ' ';
}

function format_result(result) {
    var row = '        <tr><td>';
    row += format_resistance(result['R']);
    row += 'Ω</td><td>';
    row += format_capacitance(result['C']);
    row += 'F</td><td>';
    row += format_tau(result['tau']);
    row += 's</td></tr>\n';
    return row;
}

$(function () {
    $('#calculate').click(function() {
        var t = parseFloat($('#tau').val());
        if (Number.isNaN(t) || t <= 0) {
            alert("Invalid target tau value!");
        }
        var tolerance = parseFloat($('#tau-tolerance').val());

        var params = {
            'resistors': get_resistors(),
            'capacitors': get_capacitors(),
            'tau': t,
            'tolerance': tolerance / 100.0
        };
        var results = tau(params);

        var tbody = $('#result-body');
        tbody.empty();
        if (results.length === 0) {
            console.log('No results')
            tbody.append('        <tr><td colspan="3" style="text-align: center;">No results.</td></tr>\n');
        }
        else {
            console.log('%d results', results.length);
            for (var i = 0; i < results.length; ++i) {
                var row = format_result(results[i]);
                tbody.append(row);
            }
        }
    });
});
