# Vue 3 + Typescript + Vite

## Steps to install

```
    yarn install
```

## Steps to run dev

```
    yarn dev
```

## Setap to production package

```
     yarn build
```

## App Logic

### Column params

To config a column params you have different fields (mandatory or not). Here you can found the definition:

- Field: Item in row. Mandatory
- Label: Name to show in the header. Default: the field will the label
- Sortable: Sortable option. Default: false
- Format: This variable can define the method to print the measure. Options: location | speed | temperature | numeric. Default: Empry format.
- Measure: Metric unit. Not default option
- Precision: If you have a number with this variable you can assign a precision to the decimal. Not default option

```

{
    "field": "speed",
    "label": "Speed",
    "sortable": false,
    "format": "speed",
    "measure": "kmh",
    "precision": 2
}

```

### Row params

You can add as many fields as elements you have configured in the column. Example:

```
{
    "id": 1,
    "plate": "0000LBN",
    "location": {
        "country": "Spain",
        "city": "Valencia",
        "postal_code": "46004",
        "address": "Carrer de Colón"
    },
    "speed": 25.56789,
    "speed_average": 30.123456789,
    "temperature_front": 19.5456789,
    "temperature_back": 3.23456789
}

```

## Style customization

Is possible modify the column format adding a global style that overwritten the row style. For example, if you prefer have a row with other params alignment you can add this code in assets/global.css

```

.item-inner {
  grid-template-areas: 'id plate plate location location' 'id speed speed_average temperature_front temperature_back' !important;
}

```

## Next steps

- Add i18n to have better UX, for example in title field
- Add pagination option. In this moment, the table only work with scroll infinity.
