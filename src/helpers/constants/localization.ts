export const LANGS = {
  am: 'am',
  en: 'en',
} as const

export const REGIONS_IDS = {
  aragatsotn: 'aragatsotn',
  ararat: 'ararat',
  armavir: 'armavir',
  yerevan: 'yerevan',
  gegharquniq: 'gegharquniq',
  kotayk: 'kotayk',
  lori: 'lori',
  shirak: 'shirak',
  syunik: 'syunik',
  tavush: 'tavush',
  vayotsdzor: 'vayotsdzor',
} as const

export const REGIONS_LOCALIZE_OPTIONS = {
  [LANGS.en]: {
    [REGIONS_IDS.aragatsotn]: 'Aragatsotn',
    [REGIONS_IDS.ararat]: 'Ararat',
    [REGIONS_IDS.armavir]: 'Armavir',
    [REGIONS_IDS.yerevan]: 'Yerevan',
    [REGIONS_IDS.gegharquniq]: 'Gegharquniq',
    [REGIONS_IDS.kotayk]: 'Kotayk',
    [REGIONS_IDS.lori]: 'Lori',
    [REGIONS_IDS.shirak]: 'Shirak',
    [REGIONS_IDS.syunik]: 'Syunik',
    [REGIONS_IDS.tavush]: 'Tavush',
    [REGIONS_IDS.vayotsdzor]: 'Vayots dzor',
    appTitle: 'Chart generator based on the administrative territorial division of the Republic of Armenia',
    chartData: 'Chart data',
    chartDataPlaceholder: 'Insert tab delimited text here',
    tabDelimitedTextProcessorButton: 'Process Tab Delimited Text',
    skipToDataInputTableButton: 'Skip to Table',
    regionID: 'Region ID',
    regionName: 'Region Name',
    regionValue: 'Value',
    legendData: 'Legend Data',
    legendName: 'Name',
    legendRangeStart: 'Range Start',
    legendRangeEnd: 'Range End',
    legendColor: 'Color',
    chartStyles: 'Chart Styles',
    chartStylesLabels: 'Labels',
    chartStylesBorder: 'Border',
    chartStylesBorderShow: 'Show Border',
    chartStylesBorderWidth: 'Width',
    chartStylesBorderColor: 'Color',
    chartStylesShadow: 'Shadow',
    chartStylesShadowShow: 'Show Shadow',
    chartStylesShadowOffset: 'Offset',
    chartStylesShadowBlurred: 'Blur',
    chartStylesShadowColor: 'Color',
    chartStylesShowLabels: 'Show Labels',
    chartStylesTextColor: 'Text Color',
    chartStylesFontSize: 'Font Size',
    legendStyles: 'Legend Styles',
    legendStylesLabels: 'Labels',
    legendStylesBorder: 'Border',
    legendStylesBorderShow: 'Show Border',
    legendStylesBorderColor: 'Border Color',
    legendStylesBorderWidth: 'Border Width',
    legendStylesShowLabels: 'Show Legend',
    legendStylesTextColor: 'Text Color',
    legendStylesFontSize: 'Font Size',
    exportType: 'Export type',
    download: 'Download',
  },
  [LANGS.am]: {
    [REGIONS_IDS.aragatsotn]: 'Արագածոտն',
    [REGIONS_IDS.ararat]: 'Արարատ',
    [REGIONS_IDS.armavir]: 'Արմավիր',
    [REGIONS_IDS.yerevan]: 'Երևան',
    [REGIONS_IDS.gegharquniq]: 'Գեղարքունիք',
    [REGIONS_IDS.kotayk]: 'Կոտայք',
    [REGIONS_IDS.lori]: 'Լոռի',
    [REGIONS_IDS.shirak]: 'Շիրակ',
    [REGIONS_IDS.syunik]: 'Սյունիք',
    [REGIONS_IDS.tavush]: 'Տավուշ',
    [REGIONS_IDS.vayotsdzor]: 'Վայոց ձոր',
    appTitle: 'Գծապատկերի գեներատոր՝ Հայաստանի Հանրապետության վարչատարածքային բաժանման հիման վրա',
    chartData: 'Հիմնական տվյալներ',
    chartDataPlaceholder: 'Այստեղ կարող եք տվյալները տեղադրել տեքստային ձևաչափով',
    tabDelimitedTextProcessorButton: 'Մշակել',
    skipToDataInputTableButton: 'Անցնել աղյուսակային ձևաչափի',
    regionID: 'Մարզի նույնականացում',
    regionName: 'Անվանում',
    regionValue: 'Արժեք',
    legendData: 'Լեգենդի տվյալներ',
    legendName: 'Անվանում',
    legendRangeStart: 'Միջակայքի սկզբնակետ',
    legendRangeEnd: 'Միջակայքի վերջնակետ',
    legendColor: 'Գույն',
    chartStyles: 'Գծապատկերի ոճավորում',
    chartStylesLabels: 'Անվանումներ',
    chartStylesBorder: 'Սահմանագիծ',
    chartStylesBorderShow: 'Ցույց տալ',
    chartStylesBorderWidth: 'Հաստություն',
    chartStylesBorderColor: 'Գույն',
    chartStylesShadow: 'Ստվեր',
    chartStylesShadowShow: 'Ցույց տալ',
    chartStylesShadowOffset: 'Խորություն',
    chartStylesShadowBlurred: 'Նոսրություն',
    chartStylesShadowColor: 'Գույն',
    chartStylesShowLabels: 'Ցույց տալ',
    chartStylesTextColor: 'Տեքստի գույն',
    chartStylesFontSize: 'Տառաչափ',
    legendStyles: 'Լեգենդի ոճավորում',
    legendStylesLabels: 'Ցույց տալ',
    legendStylesBorder: 'Սահմանագիծ',
    legendStylesBorderColor: 'Սահմանագծի գույն',
    legendStylesBorderShow: 'Ցույց տալ',
    legendStylesBorderWidth: 'Հաստություն',
    legendStylesShowLabels: 'Ցույց տալ լեգենդը',
    legendStylesTextColor: 'Տեքստի գույն',
    legendStylesFontSize: 'Տառաչափ',
    exportType: 'Արտահանվող ֆայլի տեսակ',
    download: 'Ներբերռնել',
  },
} as const
