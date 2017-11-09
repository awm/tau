<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_CHTML"></script>
<script type="text/javascript">
    MathJax.Hub.Config({
        asciimath2jax: {
            delimiters: [['$','$']]
        }
    });
</script>
<script type="text/javascript" src="{{ '/assets/js/tau.js' | relative_url }}"></script>

### Time Constant Calculation

Most examples of RC calculators do one of two things.  Either they ask you to
provide both component values and show how to determine the time constant (τ)
from them, or they arbitrarily fix one of the values (for example, setting the
resistor to 10 kΩ) to determine the other.  The calculator presented below takes
advantage of the fact that resistors and capacitors come in fairly standardized
values, and so there is a relatively small finite pool of combinations that can
be assembled.

Given the desired τ value and resistor tolerance (which determines the pool of
available resistances), this calculator provides all combinations of R and C
that generate time constants within an acceptable tolerance of the desired
value.

<form id="rendered-form">
    <div class="rendered-form">
        <div class="fb-text form-group field-tau">
            <label for="tau" class="fb-text-label">Target τ (s)
                <span class="fb-required">*
                </span>
                <span class="tooltip-element" tooltip="Enter the desired RC time constant in seconds.">?
                </span>
            </label>
            <input type="text" placeholder="1e-3" class="form-control" name="tau" value="1e-3" id="tau" title="Enter the desired RC time constant in seconds." required="required" aria-required="true">
        </div>
        <div class="fb-number form-group field-tau-tolerance">
            <label for="tau-tolerance" class="fb-number-label">τ Tolerance (%)
                <span class="fb-required">*
                </span>
                <span class="tooltip-element" tooltip="Allowed percent deviation from the desired time constant.">?
                </span>
            </label>
            <input type="number" class="form-control" name="tau-tolerance" value="5" min="1" max="100" step="1" id="tau-tolerance" title="Allowed percent deviation from the desired time constant." required="required" aria-required="true">
        </div>
        <div class="fb-radio-group form-group field-resistor-tolerance">
            <label for="resistor-tolerance" class="fb-radio-group-label">Resistor Tolerance
                <span class="fb-required">*
                </span>
                <span class="tooltip-element" tooltip="Select the standard resistor tolerance percentage.  This influences the pool of available resistor values.">?
                </span>
            </label>
            <div class="radio-group">
                <div class="radio-inline">
                    <input name="resistor-tolerance" id="resistor-tolerance-0" required="required" aria-required="true" value="1" type="radio">
                    <label for="resistor-tolerance-0">1%
                    </label>
                </div>
                <div class="radio-inline">
                    <input name="resistor-tolerance" id="resistor-tolerance-2" required="required" aria-required="true" value="2" type="radio">
                    <label for="resistor-tolerance-2">2%
                    </label>
                </div>
                <div class="radio-inline">
                    <input name="resistor-tolerance" id="resistor-tolerance-5" required="required" aria-required="true" value="5" type="radio" checked="checked">
                    <label for="resistor-tolerance-5">5%
                    </label>
                </div>
                <div class="radio-inline">
                    <input name="resistor-tolerance" id="resistor-tolerance-10" required="required" aria-required="true" value="10" type="radio">
                    <label for="resistor-tolerance-10">10%
                    </label>
                </div>
            </div>
        </div>
        <div class="fb-textarea form-group field-extra-resistors">
            <label for="extra-resistors" class="fb-textarea-label">Additional Resistor Values (Ω)
                <span class="tooltip-element" tooltip="Resistor values beyond the standard list to consider when performing calculations.  Multiple entries may be separated with commas.">?
                </span>
            </label>
            <textarea type="textarea" class="form-control" name="extra-resistors" rows="2" id="extra-resistors" title="Resistor values beyond the standard list to consider when performing calculations.  Multiple entries may be separated with commas."></textarea>
        </div>
        <div class="fb-textarea form-group field-extra-capacitors">
            <label for="extra-capacitors" class="fb-textarea-label">Additional Capacitor Values (F)
                <span class="tooltip-element" tooltip="Capacitor values beyond the standard list to consider when performing calculations.  Multiple entries may be separated with commas.">?
                </span>
            </label>
            <textarea type="textarea" class="form-control" name="extra-capacitors" rows="2" id="extra-capacitors" title="Capacitor values beyond the standard list to consider when performing calculations.  Multiple entries may be separated with commas."></textarea>
        </div>
        <div class="fb-button form-group field-calculate">
            <button type="button" class="btn btn-primary" name="calculate" value="calculate" style="primary" id="calculate">Calculate
            </button>
        </div>
    </div>
</form>

### Results

Results are shown in order of the difference from the desired τ value, from
smallest to largest.  Where the calculated τ values are the same, the entries
are organized by descending resistance value, as generally the larger resistance
will give a lower current draw and a physically smaller capacitor.  This is a
suggestion only, and you should use components that make sense in your
application.

<table id="result-table">
    <thead>
        <tr>
            <th>R</th>
            <th>C</th>
            <th>τ</th>
            <th>Δ</th>
        </tr>
    </thead>
    <tbody id="result-body">
        <tr>
            <td colspan="4" style="text-align: center;">No results.</td>
        </tr>
    </tbody>
</table>

These results are not guaranteed to be error-free or suitable for any specific
purpose.

----

### Resistors

Resistors are calculated using the following formula:

<div align="center" style="font-size: 200%">
$R = 10^d * 10^(i/N)$
</div>

Here, the resistance, $R$, is derived from the decade, $d$, and the tolerance
series, $N$.  The value of $i$ ranges from $0$ to $N - 1$ to generate the
standard resistor values.  The value of $d$ ranges from
<span id="d-min">1</span> to <span id="d-max">6</span>.  For the tolerance
series, $N$ takes the values <span id="n-1">96</span>, <span id="n-2">48</span>,
<span id="n-5">24</span>, and <span id="n-10">12</span> for 1%, 2%, 5%, and 10%
respectively.

#### Additional 1% Resistors

The following values are not part of the normal series, but also exist for 1%
tolerance resistors.

<table id="resistor-1-fixed-table">
    <tbody id="resistor-1-fixed-body">
        <tr>
            <td>1.10e6</td><td>1.20e6</td><td>1.30e6</td><td>1.50e6</td>
            <td>1.60e6</td><td>1.80e6</td><td>2.00e6</td><td>2.20e6</td>
        </tr>
    </tbody>
</table>

Source: [Standard Resistor Values - RF Cafe][1]

### Capacitor Values

These are the standard capacitor values in Farads.

<table id="capacitor-table">
    <tbody id="capacitor-body">
        <tr>
            <td>1.0e-12</td><td>1.1e-12</td><td>1.2e-12</td><td>1.3e-12</td>
            <td>1.5e-12</td><td>1.6e-12</td><td>1.8e-12</td><td>2.0e-12</td>
        </tr>
        <tr>
            <td>2.2e-12</td><td>2.4e-12</td><td>2.7e-12</td><td>3.0e-12</td>
            <td>3.3e-12</td><td>3.6e-12</td><td>3.9e-12</td><td>4.3e-12</td>
        </tr>
        <tr>
            <td>4.7e-12</td><td>5.1e-12</td><td>5.6e-12</td><td>6.2e-12</td>
            <td>6.8e-12</td><td>7.5e-12</td><td>8.2e-12</td><td>9.1e-12</td>
        </tr>
        <tr>
            <td>10e-12</td><td>11e-12</td><td>12e-12</td><td>13e-12</td>
            <td>15e-12</td><td>16e-12</td><td>18e-12</td><td>20e-12</td>
        </tr>
        <tr>
            <td>22e-12</td><td>24e-12</td><td>27e-12</td><td>30e-12</td>
            <td>33e-12</td><td>36e-12</td><td>39e-12</td><td>43e-12</td>
        </tr>
        <tr>
            <td>47e-12</td><td>51e-12</td><td>56e-12</td><td>62e-12</td>
            <td>68e-12</td><td>75e-12</td><td>82e-12</td><td>91e-12</td>
        </tr>
        <tr>
            <td>100e-12</td><td>110e-12</td><td>120e-12</td><td>130e-12</td>
            <td>150e-12</td><td>160e-12</td><td>180e-12</td><td>200e-12</td>
        </tr>
        <tr>
            <td>220e-12</td><td>240e-12</td><td>270e-12</td><td>300e-12</td>
            <td>330e-12</td><td>360e-12</td><td>390e-12</td><td>430e-12</td>
        </tr>
        <tr>
            <td>470e-12</td><td>510e-12</td><td>560e-12</td><td>620e-12</td>
            <td>680e-12</td><td>750e-12</td><td>820e-12</td><td>910e-12</td>
        </tr>
        <tr>
            <td>1000e-12</td><td>1100e-12</td><td>1200e-12</td><td>1300e-12</td>
            <td>1500e-12</td><td>1600e-12</td><td>1800e-12</td><td>2000e-12</td>
        </tr>
        <tr>
            <td>2200e-12</td><td>2400e-12</td><td>2700e-12</td><td>3000e-12</td>
            <td>3300e-12</td><td>3600e-12</td><td>3900e-12</td><td>4300e-12</td>
        </tr>
        <tr>
            <td>4700e-12</td><td>5100e-12</td><td>5600e-12</td><td>6200e-12</td>
            <td>6800e-12</td><td>7500e-12</td><td>8200e-12</td><td>9100e-12</td>
        </tr>
        <tr>
            <td>0.01e-6</td><td>0.015e-6</td><td>0.022e-6</td><td>0.033e-6</td>
            <td>0.047e-6</td><td>0.068e-6</td><td>0.1e-6</td><td>0.15e-6</td>
        </tr>
        <tr>
            <td>0.22e-6</td><td>0.33e-6</td><td>0.47e-6</td><td>0.68e-6</td>
            <td>1.0e-6</td><td>1.5e-6</td><td>2.2e-6</td><td>3.3e-6</td>
        </tr>
        <tr>
            <td>4.7e-6</td><td>6.8e-6</td><td>10e-6</td><td>15e-6</td>
            <td>22e-6</td><td>33e-6</td><td>47e-6</td><td>68e-6</td>
        </tr>
        <tr>
            <td>100e-6</td><td>150e-6</td><td>220e-6</td><td>330e-6</td>
            <td>470e-6</td><td>680e-6</td><td>1000e-6</td><td>1500e-6</td>
        </tr>
        <tr>
            <td>2200e-6</td><td>3300e-6</td><td>4700e-6</td><td>6800e-6</td>
            <td>10000e-6</td><td colspan="3"></td>
        </tr>
    </tbody>
</table>

Source: [Standard Capacitor Values & Color Codes - RF Cafe][2]

[1]: http://www.rfcafe.com/references/electrical/resistor-values.htm
[2]: http://www.rfcafe.com/references/electrical/capacitor-values.htm
