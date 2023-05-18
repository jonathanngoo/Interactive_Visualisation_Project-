const unpack = (data, key) => data.map((row) => row[key]);

Plotly.d3.csv("whales-killed-per-decade-final.csv", (whale_data) => {
  const Year = unpack(whale_data, "Year");
  const allSpecies = unpack(whale_data, "All species (Rocha et al. & IWC)");

  var trace1 = {
    x: Year,
    y: allSpecies,
    hovertemplate: "%{y:.f}",
    mode: "scatter",
    name: "All species",
  };

  //   let data = [
  //     {
  //       type: "lines",
  //       Year: Year,
  //       allSpecies: allSpecies,
  //       marker: {
  //         color: "Blue",
  //       },
  //     },
  //   ];

  // Layout including title, x and y axis from https://plotly.com/javascript/legend/
  let layout = {
    title: "Whales killed per decade",
    xaxis: {
      title: "Year",
      showgrid: false,
      zeroline: false,
    },
    yaxis: {
      title: "Amount of whales killed",
      showline: false,
    },
    showlegend: true,
  };

  var data = [trace1];

  Plotly.newPlot("linegraph", data, layout);
});

// Animation bar graph from 1890 to 2001 using this link: https://plotly.com/javascript/gapminder-example/
Plotly.d3.csv(
  "The decline of global whale populations in 1890 and 2001 - Sheet1.csv",
  (whale_data) => {
    var lookup = {};
    function getData(Year, Whalepopulations) {
      var byYear, trace;
      if (!(byYear = lookup[Year])) {
        byYear = lookup[Year] = {};
      }

      if (!(trace = byYear[Whalepopulations])) {
        trace = byYear[Whalepopulations] = {
          x: [],
          y: [],
          id: [],
          text: [],
          marker: { size: [] },
        };
      }
      return trace;
    }

    for (var i = 0; i < whale_data.length; i++) {
      var datum = whale_data[i];
      var trace = getData(datum.Year, datum.Entity);
      trace.text.push(datum.Year, datum.Whalepopulations);
      trace.id.push(datum.Entity);
      trace.x.push(datum.Entity);
      trace.y.push(datum.Whalepopulations);
      trace.marker.size.push(datum.pop);
    }

    var years = Object.keys(lookup);
    var firstYear = lookup[years[0]];
    var entity = Object.keys(firstYear);

    var traces = [];
    for (i = 0; i < entity.length; i++) {
      var data = firstYear[entity[i]];

      traces.push({
        name: entity[i],
        y: data.y.slice(),
        id: data.id.slice(),
        text: data.text.slice(),
        type: "bar",
      });
    }

    var frames = [];
    for (i = 0; i < years.length; i++) {
      frames.push({
        name: years[i],
        data: entity.map(function (entity) {
          return getData(years[i], entity);
        }),
      });
    }

    var sliderSteps = [];
    for (i = 0; i < years.length; i++) {
      sliderSteps.push({
        method: "animate",
        label: years[i],
        args: [
          [years[i]],
          {
            mode: "immediate",
            transition: { duration: 300 },
            frame: { duration: 300, redraw: false },
          },
        ],
      });
    }

    var layout = {
      title: "Global Whale populations",
      xaxis: {
        title: "Year",
      },
      yaxis: {
        title: "Whale Population",
      },
      hovermode: "closest",
      // Adding width from Jacob
      width: 400,

      updatemenus: [
        {
          x: 0,
          y: 0,
          yanchor: "top",
          xanchor: "left",
          showactive: false,
          direction: "right",
          type: "buttons",
          pad: { t: 87, r: 10 },
          buttons: [
            {
              method: "animate",
              args: [
                null,
                {
                  mode: "immediate",
                  fromcurrent: true,
                  transition: { duration: 300 },
                  frame: { duration: 500, redraw: false },
                },
              ],
              label: "Play",
            },
            {
              method: "animate",
              args: [
                [null],
                {
                  mode: "immediate",
                  transition: { duration: 0 },
                  frame: { duration: 0, redraw: false },
                },
              ],
              label: "Pause",
            },
          ],
        },
      ],

      sliders: [
        {
          pad: { l: 130, t: 55 },
          currentvalue: {
            visible: true,
            prefix: "Year:",
            xanchor: "left",
            font: { size: 14, color: "#666" },
          },
          steps: sliderSteps,
        },
      ],
    };

    Plotly.newPlot("barchart", {
      data: traces,
      layout: layout,
      frames: frames,
    });
  }
);

Plotly.d3.csv("whale-catch - Sheet1.csv", (whale_data) => {
  const Entity = unpack(whale_data, "Entity");
  const allSpecies = unpack(whale_data, "All whale species (Rocha et al.; IWC)");

  var trace1 = {
    x: Entity,
    y: allSpecies,
    hovertemplate: "%{y:.f}",
    type: "bar",
    name: "Whale population in 1960",
    marker: {
      color: ['#D95040','#1C428D']
    }
  };


  let layout = {
    title: "Whale population in 1960",
    width: 400,
    xaxis: {
      title: "Entity",
      showgrid: false,
      zeroline: false,
    },
    yaxis: {
      title: "All whale species",
      showline: false,
    },
    showlegend: false,
  };

  var data = [trace1];

  Plotly.newPlot("barchart2", data, layout);
});
