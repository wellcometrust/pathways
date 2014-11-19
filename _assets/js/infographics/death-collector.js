window.TheCollectors = {};

$(function() {
    //Initialise the interface object with the Data object

    if ($('#radial').length === 0) return;

    var SCREEN_MODE;
    if ($(window).width() > 480) {
        SCREEN_MODE = TheCollectors.SCREEN_MODE_DESKTOP;
    } else {
        SCREEN_MODE = TheCollectors.SCREEN_MODE_MOBILE;
    }

    TheCollectors.Interface.Init(SCREEN_MODE);


    $(window).resize(function() {
        if (($(window).width() > 480) && (SCREEN_MODE == TheCollectors.SCREEN_MODE_MOBILE)) {
            SCREEN_MODE = TheCollectors.SCREEN_MODE_DESKTOP;
            TheCollectors.Interface.changeScreenMode(SCREEN_MODE);
            return;
        }

        if (($(window).width() < 480) && (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP)) {
            SCREEN_MODE = TheCollectors.SCREEN_MODE_MOBILE;
            TheCollectors.Interface.changeScreenMode(SCREEN_MODE);
            return;
        }

    });

});


TheCollectors.SCREEN_MODE_MOBILE = 'mobile';
TheCollectors.SCREEN_MODE_DESKTOP = 'desktop';

TheCollectors.getData = function(SCREEN_MODE) {
    if (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP) {
        return TheCollectors.data;
    } else if (SCREEN_MODE == TheCollectors.SCREEN_MODE_MOBILE) {
        var dataToReturn = [];
        for (var i = 0; i < TheCollectors.data.length; i++) {
            if (TheCollectors.data[i].mobileData) dataToReturn.push(TheCollectors.data[i]);
        }
        return dataToReturn;
    }
    console.log('NO DATA FOUND');
    return 'NO DATA FOUND';

};

TheCollectors.assetRoot = '/_assets/img/infographics/death-collector/';

TheCollectors.data = [{

        name: "Abortive, and stilborn",
        description: "These figures almost certainly include both deliberate abortions, brought on by imbibing herbal concoctions, and miscarriages. Since babies who died in the womb had not received baptism, stillborns were either not buried at all, or were interred in secret, unconsecrated locations.",
        ValueLabelPos_desktop: {
            x: 20,
            y: -232
        },
        mobileData: false,
        imgID: 0,
        data: [{
            year: 1629,
            value: 499
        }, {
            year: 1630,
            value: 439
        }, {
            year: 1631,
            value: 410
        }, {
            year: 1632,
            value: 445
        }, {
            year: 1633,
            value: 500
        }, {
            year: 1634,
            value: 475
        }, {
            year: 1635,
            value: 507
        }, {
            year: 1636,
            value: 523
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 335
        }, {
            year: 1648,
            value: 329
        }, {
            year: 1649,
            value: 327
        }, {
            year: 1650,
            value: 351
        }, {
            year: 1651,
            value: 389
        }, {
            year: 1652,
            value: 381
        }, {
            year: 1653,
            value: 384
        }, {
            year: 1654,
            value: 433
        }, {
            year: 1655,
            value: 483
        }, {
            year: 1656,
            value: 419
        }, {
            year: 1657,
            value: 463
        }, {
            year: 1658,
            value: 467
        }, {
            year: 1659,
            value: 421
        }, {
            year: 1660,
            value: 544
        }]
    },

    {
        name: "Aged",
        description: "'Aged' referred to deaths when over 60, or perhaps 70, years old. Graunt calculated that only two or three of every 100 individuals born in London would live to such a ripe old age. His own father was one of these few, along with his friend Samuel Pepys. Graunt himself died at the age of 54.",
        ValueLabelPos_desktop: {
            x: 42,
            y: -110
        },
        mobileData: false,
        imgID: 1,
        data: [

            {
                year: 1629,
                value: 579
            }, {
                year: 1630,
                value: 712
            }, {
                year: 1631,
                value: 661
            }, {
                year: 1632,
                value: 671
            }, {
                year: 1633,
                value: 704
            }, {
                year: 1634,
                value: 623
            }, {
                year: 1635,
                value: 794
            }, {
                year: 1636,
                value: 714
            }, {
                year: 1637,
                value: "NO DATA"
            }, {
                year: 1638,
                value: "NO DATA"
            }, {
                year: 1639,
                value: "NO DATA"
            }, {
                year: 1640,
                value: "NO DATA"
            }, {
                year: 1641,
                value: "NO DATA"
            }, {
                year: 1642,
                value: "NO DATA"
            }, {
                year: 1643,
                value: "NO DATA"
            }, {
                year: 1644,
                value: "NO DATA"
            }, {
                year: 1645,
                value: "NO DATA"
            }, {
                year: 1646,
                value: "NO DATA"
            }, {
                year: 1647,
                value: 916
            }, {
                year: 1648,
                value: 835
            }, {
                year: 1649,
                value: 889
            }, {
                year: 1650,
                value: 696
            }, {
                year: 1651,
                value: 780
            }, {
                year: 1652,
                value: 834
            }, {
                year: 1653,
                value: 864
            }, {
                year: 1654,
                value: 974
            }, {
                year: 1655,
                value: 743
            }, {
                year: 1656,
                value: 892
            }, {
                year: 1657,
                value: 869
            }, {
                year: 1658,
                value: 1176
            }, {
                year: 1659,
                value: 909
            }, {
                year: 1660,
                value: 1095
            }
        ]
    },

    {
        name: "Ague, and Fever",
        description: "Ague and fever are rather catch-all symptoms, which may result from any number of conditions. When William Shakespeare died on his fifty-third birthday in 1616 he had been suffering fevers for several weeks. No one is quite sure what caused his death, though syphilis, typhoid, influenza and alcoholism have all been mooted.",
        ValueLabelPos_desktop: {
            x: 110,
            y: -135
        },
        mobileData: false,
        imgID: 2,
        data: [{
            year: 1629,
            value: 956

        }, {
            year: 1630,
            value: 1091
        }, {
            year: 1631,
            value: 1115
        }, {
            year: 1632,
            value: 1108
        }, {
            year: 1633,
            value: 953
        }, {
            year: 1634,
            value: 1279
        }, {
            year: 1635,
            value: 1622
        }, {
            year: 1636,
            value: 2360
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 1260
        }, {
            year: 1648,
            value: 884
        }, {
            year: 1649,
            value: 751
        }, {
            year: 1650,
            value: 970
        }, {
            year: 1651,
            value: 1038
        }, {
            year: 1652,
            value: 1212
        }, {
            year: 1653,
            value: 1282
        }, {
            year: 1654,
            value: 1371
        }, {
            year: 1655,
            value: 689
        }, {
            year: 1656,
            value: 875
        }, {
            year: 1657,
            value: 999
        }, {
            year: 1658,
            value: 1800
        }, {
            year: 1659,
            value: 2303
        }, {
            year: 1660,
            value: 2148
        }]
    },

    {
        name: "Cancer, Gangrene, and Fistula",
        description: "Cancer was only diagnosed when it could be observed externally, with most cases seen in the breast or face. Blamed on an excess of melancholic black bile, it was perceived as a fierce and ravenous evil that gnawed away the body. The grievous symptoms caused many sufferers to subject themselves to surgical treatments, which brought their own high risks of death.",
        ValueLabelPos_desktop: {
            x: 220,
            y: -130
        },
        mobileData: false,
        imgID: 3,
        data: [

            {
                year: 1629,
                value: 20
            }, {
                year: 1630,
                value: 14
            }, {
                year: 1631,
                value: 23
            }, {
                year: 1632,
                value: 28
            }, {
                year: 1633,
                value: 27
            }, {
                year: 1634,
                value: 30
            }, {
                year: 1635,
                value: 24
            }, {
                year: 1636,
                value: 30
            }, {
                year: 1637,
                value: "NO DATA"
            }, {
                year: 1638,
                value: "NO DATA"
            }, {
                year: 1639,
                value: "NO DATA"
            }, {
                year: 1640,
                value: "NO DATA"
            }, {
                year: 1641,
                value: "NO DATA"
            }, {
                year: 1642,
                value: "NO DATA"
            }, {
                year: 1643,
                value: "NO DATA"
            }, {
                year: 1644,
                value: "NO DATA"
            }, {
                year: 1645,
                value: "NO DATA"
            }, {
                year: 1646,
                value: "NO DATA"
            }, {
                year: 1647,
                value: 26
            }, {
                year: 1648,
                value: 29
            }, {
                year: 1649,
                value: 31
            }, {
                year: 1650,
                value: 19
            }, {
                year: 1651,
                value: 31
            }, {
                year: 1652,
                value: 53
            }, {
                year: 1653,
                value: 36
            }, {
                year: 1654,
                value: 37
            }, {
                year: 1655,
                value: 73
            }, {
                year: 1656,
                value: 31
            }, {
                year: 1657,
                value: 24
            }, {
                year: 1658,
                value: 35
            }, {
                year: 1659,
                value: 63
            }, {
                year: 1660,
                value: 52
            }
        ]
    },

    {
        name: "Childbed",
        description: "In the words of one seventeenth-century mother, the pain of childbirth was an 'exquisite torment' akin to the rack, but it was also a spiritual test of faith and endurance. If mothers suffered well, even those who died in the bed where they had given birth would be saved after death.",
        ValueLabelPos_desktop: {
            x: 150,
            y: -37
        },
        mobileData: false,
        imgID: 4,
        data: [{
            year: 1629,
            value: 150
        }, {
            year: 1630,
            value: 157
        }, {
            year: 1631,
            value: 112
        }, {
            year: 1632,
            value: 171
        }, {
            year: 1633,
            value: 132
        }, {
            year: 1634,
            value: 143
        }, {
            year: 1635,
            value: 163
        }, {
            year: 1636,
            value: 230
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 161
        }, {
            year: 1648,
            value: 106
        }, {
            year: 1649,
            value: 114
        }, {
            year: 1650,
            value: 117
        }, {
            year: 1651,
            value: 206
        }, {
            year: 1652,
            value: 213
        }, {
            year: 1653,
            value: 158
        }, {
            year: 1654,
            value: 192
        }, {
            year: 1655,
            value: 177
        }, {
            year: 1656,
            value: 201
        }, {
            year: 1657,
            value: 236
        }, {
            year: 1658,
            value: 225
        }, {
            year: 1659,
            value: 226
        }, {
            year: 1660,
            value: 194
        }]
    },

    {
        name: "Chrisomes, and Infants",
        description: "Almost ten per cent of babies didn't survive their first month of life. These 'chrisomes' died as a result of birth trauma, tetanus contracted when the umbilical cord was cut, low weight or inherited birth defects. Graunt's figures also include the deaths of 'infants', children who were not yet old enough to speak.",
        ValueLabelPos_desktop: {
            x: 220,
            y: 10
        },
        ValueLabelPos_mobile: {
            x: 230,
            y: -230
        },
        mobileData: true,
        imgID: 5,
        data: [{
            year: 1629,
            value: 1596

        }, {
            year: 1630,
            value: 2378
        }, {
            year: 1631,
            value: 2035
        }, {
            year: 1632,
            value: 2268
        }, {
            year: 1633,
            value: 2130
        }, {
            year: 1634,
            value: 2315
        }, {
            year: 1635,
            value: 2113
        }, {
            year: 1636,
            value: 1895
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 1369
        }, {
            year: 1648,
            value: 1254
        }, {
            year: 1649,
            value: 1065
        }, {
            year: 1650,
            value: 990
        }, {
            year: 1651,
            value: 1237
        }, {
            year: 1652,
            value: 1280
        }, {
            year: 1653,
            value: 1050
        }, {
            year: 1654,
            value: 1343
        }, {
            year: 1655,
            value: 1089
        }, {
            year: 1656,
            value: 1393
        }, {
            year: 1657,
            value: 1162
        }, {
            year: 1658,
            value: 1144
        }, {
            year: 1659,
            value: 858
        }, {
            year: 1660,
            value: 1123
        }]
    },

    {
        name: "Consumption, and Cough",
        description: "Graunt was dubious about the reliability of 'consumption' when reported as a cause of death in the Bills. The searchers, he wrote, might 'after the mist of a Cup of Ale' or a bribe apply it to any cadaver that looked in any way emaciated or lean.",
        ValueLabelPos_desktop: {
            x: 240,
            y: 75
        },
        mobileData: false,
        imgID: 6,
        data: [{
            year: 1629,
            value: 1827

        }, {
            year: 1630,
            value: 1910
        }, {
            year: 1631,
            value: 1713
        }, {
            year: 1632,
            value: 1797
        }, {
            year: 1633,
            value: 1754
        }, {
            year: 1634,
            value: 1955
        }, {
            year: 1635,
            value: 2080
        }, {
            year: 1636,
            value: 2477
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 2423
        }, {
            year: 1648,
            value: 2200
        }, {
            year: 1649,
            value: 2388
        }, {
            year: 1650,
            value: 1988
        }, {
            year: 1651,
            value: 2350
        }, {
            year: 1652,
            value: 2410
        }, {
            year: 1653,
            value: 2286
        }, {
            year: 1654,
            value: 2868
        }, {
            year: 1655,
            value: 606
        }, {
            year: 1656,
            value: 3184
        }, {
            year: 1657,
            value: 2757
        }, {
            year: 1658,
            value: 3610
        }, {
            year: 1659,
            value: 2982
        }, {
            year: 1660,
            value: 3414
        }]
    },

    {
        name: "Convulsion",
        description: "Convulsion only established itself as a reported cause of death in the seventeenth century. A symptom usually seen in young children, convulsions might be an outward sign of any number of underlying infections or diseases, including smallpox.",
        ValueLabelPos_desktop: {
            x: 135,
            y: 95
        },
        mobileData: false,
        imgID: 7,
        data: [{
            year: 1629,
            value: 52
        }, {
            year: 1630,
            value: 87
        }, {
            year: 1631,
            value: 18
        }, {
            year: 1632,
            value: 241
        }, {
            year: 1633,
            value: 221
        }, {
            year: 1634,
            value: 386
        }, {
            year: 1635,
            value: 418
        }, {
            year: 1636,
            value: 709
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 684
        }, {
            year: 1648,
            value: 491
        }, {
            year: 1649,
            value: 530
        }, {
            year: 1650,
            value: 493
        }, {
            year: 1651,
            value: 569
        }, {
            year: 1652,
            value: 653
        }, {
            year: 1653,
            value: 606
        }, {
            year: 1654,
            value: 828
        }, {
            year: 1655,
            value: 702
        }, {
            year: 1656,
            value: 1027
        }, {
            year: 1657,
            value: 807
        }, {
            year: 1658,
            value: 841
        }, {
            year: 1659,
            value: 742
        }, {
            year: 1660,
            value: 1031
        }]
    }, {
        name: "Dropsy, and Tympany",
        description: "Dropsy was an ugly, uncomfortable condition, in which the body became bloated with liquid. Usually associated with drunkenness, we now know it to be a symptom of kidney or liver problems. Sufferers, who included writers Henry Fielding and Samuel Johnson, were treated by 'tapping' and endured the added stigma of bringing their deaths upon themselves.",
        ValueLabelPos_desktop: {
            x: 165,
            y: 220
        },
        ValueLabelPos_mobile: {
            x: 250,
            y: 180
        },
        mobileData: true,
        imgID: 8,
        data: [{
            year: 1629,
            value: 235

        }, {
            year: 1630,
            value: 252
        }, {
            year: 1631,
            value: 279
        }, {
            year: 1632,
            value: 280
        }, {
            year: 1633,
            value: 266
        }, {
            year: 1634,
            value: 250
        }, {
            year: 1635,
            value: 329
        }, {
            year: 1636,
            value: 389
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 185
        }, {
            year: 1648,
            value: 434
        }, {
            year: 1649,
            value: 422
        }, {
            year: 1650,
            value: 508
        }, {
            year: 1651,
            value: 444
        }, {
            year: 1652,
            value: 556
        }, {
            year: 1653,
            value: 617
        }, {
            year: 1654,
            value: 704
        }, {
            year: 1655,
            value: 660
        }, {
            year: 1656,
            value: 706
        }, {
            year: 1657,
            value: 631
        }, {
            year: 1658,
            value: 931
        }, {
            year: 1659,
            value: 646
        }, {
            year: 1660,
            value: 872
        }]
    }, {
        name: "Drowned",
        description: "Many of the city's drownings occurred under London Bridge, then the only thoroughfare spanning the Thames. In 1641, Queen Henrietta Maria's barge overturned while navigating the hazardous rapids beneath its arches and a Woman of the Bedchamber drowned. Londoners were also known to take their own lives by deliberately jumping from boats as they passed below the bridge.",
        ValueLabelPos_desktop: {
            x: 50,
            y: 145
        },
        mobileData: false,
        imgID: 9,
        data: [{
            year: 1629,
            value: 43

        }, {
            year: 1630,
            value: 33
        }, {
            year: 1631,
            value: 29
        }, {
            year: 1632,
            value: 34
        }, {
            year: 1633,
            value: 37
        }, {
            year: 1634,
            value: 32
        }, {
            year: 1635,
            value: 32
        }, {
            year: 1636,
            value: 45
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 47
        }, {
            year: 1648,
            value: 40
        }, {
            year: 1649,
            value: 30
        }, {
            year: 1650,
            value: 27
        }, {
            year: 1651,
            value: 49
        }, {
            year: 1652,
            value: 50
        }, {
            year: 1653,
            value: 53
        }, {
            year: 1654,
            value: 30
        }, {
            year: 1655,
            value: 43
        }, {
            year: 1656,
            value: 4
        }, {
            year: 1657,
            value: 63
        }, {
            year: 1658,
            value: 60
        }, {
            year: 1659,
            value: 57
        }, {
            year: 1660,
            value: 48
        }]
    }, {
        name: "Executed",
        description: "Criminals convicted of murder, wounding, robbery and rape all usually received the death penalty, though many were pardoned before being led to the scaffold. One convict who didn't get away was King Charles I, who was beheaded at Whitehall on January 30 1649, for 'High Treason and other high crimes'.",
        ValueLabelPos_desktop: {
            x: 10,
            y: 145
        },
        mobileData: false,
        imgID: 10,
        data: [{
            year: 1629,
            value: 19

        }, {
            year: 1630,
            value: 13
        }, {
            year: 1631,
            value: 12
        }, {
            year: 1632,
            value: 18
        }, {
            year: 1633,
            value: 13
        }, {
            year: 1634,
            value: 13
        }, {
            year: 1635,
            value: 13
        }, {
            year: 1636,
            value: 13
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 8
        }, {
            year: 1648,
            value: 17
        }, {
            year: 1649,
            value: 29
        }, {
            year: 1650,
            value: 43
        }, {
            year: 1651,
            value: 24
        }, {
            year: 1652,
            value: 12
        }, {
            year: 1653,
            value: 19
        }, {
            year: 1654,
            value: 21
        }, {
            year: 1655,
            value: 19
        }, {
            year: 1656,
            value: 22
        }, {
            year: 1657,
            value: 20
        }, {
            year: 1658,
            value: 18
        }, {
            year: 1659,
            value: 7
        }, {
            year: 1660,
            value: 18
        }]
    }, {
        name: "Fainted in a Bath",
        description: "Bathing was not only an unusual occurrence in the seventeenth century, it might also be considered dangerous. A popular pamphlet providing medical advice a century before had advised to 'use no baths or stoves' during outbreaks of plague. The publication explained that bathing opened up the skin's pores, so that 'venomous' air might infect the body.",
        ValueLabelPos_desktop: {
            x: -27,
            y: 195
        },
        mobileData: false,
        imgID: 11,
        data: [{
            year: 1629,
            value: 0

        }, {
            year: 1630,
            value: 0
        }, {
            year: 1631,
            value: 0
        }, {
            year: 1632,
            value: 0
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 0
        }, {
            year: 1635,
            value: 0
        }, {
            year: 1636,
            value: 0
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 0
        }, {
            year: 1648,
            value: 0
        }, {
            year: 1649,
            value: 0
        }, {
            year: 1650,
            value: 0
        }, {
            year: 1651,
            value: 0
        }, {
            year: 1652,
            value: 1
        }, {
            year: 1653,
            value: 0
        }, {
            year: 1654,
            value: 0
        }, {
            year: 1655,
            value: 0
        }, {
            year: 1656,
            value: 0
        }, {
            year: 1657,
            value: 0
        }, {
            year: 1658,
            value: 0
        }, {
            year: 1659,
            value: 0
        }, {
            year: 1660,
            value: 0
        }]
    }, {
        name: "Flox, and Small Pox",
        description: "Smallpox deaths are probably under-reported in the Bills, since the most severe form of the disease killed its victims so quickly the distinctive pustules had not yet erupted. Those who survived the feverish horror of the disease might, however, end up blinded, deafened or grossly disfigured by pits and holes.",
        ValueLabelPos_desktop: {
            x: -100,
            y: 195
        },
        mobileData: false,
        imgID: 12,
        data: [{
            year: 1629,
            value: 72

        }, {
            year: 1630,
            value: 40
        }, {
            year: 1631,
            value: 58
        }, {
            year: 1632,
            value: 531
        }, {
            year: 1633,
            value: 72
        }, {
            year: 1634,
            value: 1354
        }, {
            year: 1635,
            value: 293
        }, {
            year: 1636,
            value: 127
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 139
        }, {
            year: 1648,
            value: 400
        }, {
            year: 1649,
            value: 1190
        }, {
            year: 1650,
            value: 184
        }, {
            year: 1651,
            value: 525
        }, {
            year: 1652,
            value: 1279
        }, {
            year: 1653,
            value: 239
        }, {
            year: 1654,
            value: 812
        }, {
            year: 1655,
            value: 1294
        }, {
            year: 1656,
            value: 823
        }, {
            year: 1657,
            value: 835
        }, {
            year: 1658,
            value: 409
        }, {
            year: 1659,
            value: 1523
        }, {
            year: 1660,
            value: 354
        }]
    }, {
        name: "Found dead in the Streets",
        description: "Seventeenth-century dramatist Nathaniel Lee, known as the 'Mad Poet', was found dead in the street after a night of riot and extravagance. In his play Caesar Borgia, Lee had described death as unwelcome, but only because it delivered 'an eternal laziness'.",
        ValueLabelPos_desktop: {
            x: -160,
            y: 185
        },
        mobileData: false,
        imgID: 13,
        data: [{
            year: 1629,
            value: 18
        }, {
            year: 1630,
            value: 33
        }, {
            year: 1631,
            value: 26
        }, {
            year: 1632,
            value: 6
        }, {
            year: 1633,
            value: 13
        }, {
            year: 1634,
            value: 8
        }, {
            year: 1635,
            value: 24
        }, {
            year: 1636,
            value: 24
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 6
        }, {
            year: 1648,
            value: 6
        }, {
            year: 1649,
            value: 9
        }, {
            year: 1650,
            value: 8
        }, {
            year: 1651,
            value: 7
        }, {
            year: 1652,
            value: 9
        }, {
            year: 1653,
            value: 14
        }, {
            year: 1654,
            value: 4
        }, {
            year: 1655,
            value: 3
        }, {
            year: 1656,
            value: 4
        }, {
            year: 1657,
            value: 9
        }, {
            year: 1658,
            value: 11
        }, {
            year: 1659,
            value: 2
        }, {
            year: 1660,
            value: 6
        }]
    }, {
        name: "Grief",
        description: "The intense sorrow brought on by another's demise was an accepted cause of death in the Bills. When King Charles I was executed, the deaths of Scottish poet William Drummond, the Vice-Chancellor of the University of Oxford Dr Samuel Fell and Charles's second daughter Elizabeth were all attributed to grief.",
        ValueLabelPos_desktop: {
            x: -110,
            y: 70
        },
        ValueLabelPos_mobile: {
            x: 0,
            y: 140
        },
        mobileData: true,
        imgID: 14,
        data: [{
            year: 1629,
            value: 18
        }, {
            year: 1630,
            value: 20
        }, {
            year: 1631,
            value: 22
        }, {
            year: 1632,
            value: 11
        }, {
            year: 1633,
            value: 14
        }, {
            year: 1634,
            value: 17
        }, {
            year: 1635,
            value: 5
        }, {
            year: 1636,
            value: 20
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 12
        }, {
            year: 1648,
            value: 13
        }, {
            year: 1649,
            value: 16
        }, {
            year: 1650,
            value: 7
        }, {
            year: 1651,
            value: 17
        }, {
            year: 1652,
            value: 14
        }, {
            year: 1653,
            value: 11
        }, {
            year: 1654,
            value: 17
        }, {
            year: 1655,
            value: 10
        }, {
            year: 1656,
            value: 13
        }, {
            year: 1657,
            value: 10
        }, {
            year: 1658,
            value: 12
        }, {
            year: 1659,
            value: 13
        }, {
            year: 1660,
            value: 4
        }]
    }, {
        name: "Hanged, and made-away themselves",
        description: "Graunt described those who took their own lives as 'Mad-men' who committed 'the greatest sin', and suicide was, at the time, both a civil and religious crime. Families would be keen to avoid such a report, so they might be allowed to bury their deceased relative in a churchyard and keep custody of their otherwise impounded belongings.",
        ValueLabelPos_desktop: {
            x: -290,
            y: 99
        },
        mobileData: false,
        imgID: 15,
        data: [{
            year: 1629,
            value: 8
        }, {
            year: 1630,
            value: 8
        }, {
            year: 1631,
            value: 6
        }, {
            year: 1632,
            value: 15
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 3
        }, {
            year: 1635,
            value: 8
        }, {
            year: 1636,
            value: 7
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 11
        }, {
            year: 1648,
            value: 10
        }, {
            year: 1649,
            value: 13
        }, {
            year: 1650,
            value: 14
        }, {
            year: 1651,
            value: 9
        }, {
            year: 1652,
            value: 14
        }, {
            year: 1653,
            value: 15
        }, {
            year: 1654,
            value: 9
        }, {
            year: 1655,
            value: 14
        }, {
            year: 1656,
            value: 16
        }, {
            year: 1657,
            value: 24
        }, {
            year: 1658,
            value: 18
        }, {
            year: 1659,
            value: 11
        }, {
            year: 1660,
            value: 36
        }]
    }, {
        name: "Killed by several Accidents",
        description: "In bustling seventeenth-century London, there were fatal risks at every turn. Inhabitants might tumble down a flight of stairs in an unlit home, experience a workplace accident or fall under one of the two thousand or so carts and coaches that traversed the city's crowded streets.",
        ValueLabelPos_desktop: {
            x: -260,
            y: 10
        },
        mobileData: false,
        imgID: 16,
        data: [{
            year: 1629,
            value: 54
        }, {
            year: 1630,
            value: 55
        }, {
            year: 1631,
            value: 47
        }, {
            year: 1632,
            value: 46
        }, {
            year: 1633,
            value: 49
        }, {
            year: 1634,
            value: 41
        }, {
            year: 1635,
            value: 51
        }, {
            year: 1636,
            value: 60
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 27
        }, {
            year: 1648,
            value: 57
        }, {
            year: 1649,
            value: 39
        }, {
            year: 1650,
            value: 94
        }, {
            year: 1651,
            value: 47
        }, {
            year: 1652,
            value: 45
        }, {
            year: 1653,
            value: 57
        }, {
            year: 1654,
            value: 58
        }, {
            year: 1655,
            value: 52
        }, {
            year: 1656,
            value: 43
        }, {
            year: 1657,
            value: 52
        }, {
            year: 1658,
            value: 47
        }, {
            year: 1659,
            value: 55
        }, {
            year: 1660,
            value: 47
        }]
    }, {
        name: "Murdered",
        description: "The city's murder rate may seem low, but Londoners could still be a brutal bunch. In the summer of 1628, a riotous mob of young men pursued the notorious quack 'Dr' John Lambe through the city's streets before beating him with stones and cudgels. A convicted witch and rapist who had escaped the gallows twice, Lambe may have been a victim of public justice. His killers were never apprehended.",
        ValueLabelPos_desktop: {
            x: -140,
            y: -35
        },
        ValueLabelPos_mobile: {
            x: -180,
            y: 80
        },
        mobileData: true,
        imgID: 17,
        data: [{
            year: 1629,
            value: 0
        }, {
            year: 1630,
            value: 0
        }, {
            year: 1631,
            value: 3
        }, {
            year: 1632,
            value: 7
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 6
        }, {
            year: 1635,
            value: 5
        }, {
            year: 1636,
            value: 8
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 3
        }, {
            year: 1648,
            value: 2
        }, {
            year: 1649,
            value: 7
        }, {
            year: 1650,
            value: 5
        }, {
            year: 1651,
            value: 4
        }, {
            year: 1652,
            value: 3
        }, {
            year: 1653,
            value: 3
        }, {
            year: 1654,
            value: 3
        }, {
            year: 1655,
            value: 9
        }, {
            year: 1656,
            value: 6
        }, {
            year: 1657,
            value: 5
        }, {
            year: 1658,
            value: 7
        }, {
            year: 1659,
            value: 70
        }, {
            year: 1660,
            value: 20
        }]
    }, {
        name: "Plague",
        description: "Graunt concluded that the searchers had underreported plague deaths during the Great Plague of 1625, but who could blame them? The distinctive swellings or 'buboes' didn't always appear before a victim died, families were desperate not to be quarantined in an infected house for forty days and the public feared contamination from anyone who might have been in contact with the disease.",
        ValueLabelPos_desktop: {
            x: -133,
            y: -64
        },
        ValueLabelPos_mobile: {
            x: -120,
            y: -105
        },
        mobileData: true,
        imgID: 18,
        data: [{
            year: 1629,
            value: 0

        }, {
            year: 1630,
            value: 1317
        }, {
            year: 1631,
            value: 274
        }, {
            year: 1632,
            value: 8
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 1
        }, {
            year: 1635,
            value: 0
        }, {
            year: 1636,
            value: 10400
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 3597
        }, {
            year: 1648,
            value: 611
        }, {
            year: 1649,
            value: 67
        }, {
            year: 1650,
            value: 15
        }, {
            year: 1651,
            value: 23
        }, {
            year: 1652,
            value: 16
        }, {
            year: 1653,
            value: 6
        }, {
            year: 1654,
            value: 16
        }, {
            year: 1655,
            value: 9
        }, {
            year: 1656,
            value: 6
        }, {
            year: 1657,
            value: 4
        }, {
            year: 1658,
            value: 14
        }, {
            year: 1659,
            value: 36
        }, {
            year: 1660,
            value: 14
        }]
    }, {
        name: "Rickets",
        description: "Rickets, a softening of the bones now linked with vitamin D deficiency, was the principal disease of infancy in the 1600s. Surprisingly, the aristocracy – including King Charles I – were often the worst affected, due to a diet rich in meat and low in milk. The only treatment was swaddling children so tightly that they might not stand or walk on their malleable bones.",
        ValueLabelPos_desktop: {
            x: -180,
            y: -180
        },
        mobileData: false,
        imgID: 19,
        data: [{
            year: 1629,
            value: 0
        }, {
            year: 1630,
            value: 0
        }, {
            year: 1631,
            value: 0
        }, {
            year: 1632,
            value: 0
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 14
        }, {
            year: 1635,
            value: 49
        }, {
            year: 1636,
            value: 50
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 150
        }, {
            year: 1648,
            value: 224
        }, {
            year: 1649,
            value: 216
        }, {
            year: 1650,
            value: 190
        }, {
            year: 1651,
            value: 260
        }, {
            year: 1652,
            value: 379
        }, {
            year: 1653,
            value: 229
        }, {
            year: 1654,
            value: 372
        }, {
            year: 1655,
            value: 347
        }, {
            year: 1656,
            value: 458
        }, {
            year: 1657,
            value: 317
        }, {
            year: 1658,
            value: 476
        }, {
            year: 1659,
            value: 441
        }, {
            year: 1660,
            value: 521
        }]
    }, {
        name: "Mother, rising of the Lights",
        description: "These mysterious-sounding diseases both led to breathing difficulties. The movement of either the uterus (known as 'mother') or the lungs (known as 'lights') was blamed for conditions we might now describe as croup, asthma, pleurisy or bronchitis.",
        ValueLabelPos_desktop: {
            x: -110,
            y: -220
        },
        mobileData: false,
        imgID: 20,
        data: [{
            year: 1629,
            value: 44
        }, {
            year: 1630,
            value: 72
        }, {
            year: 1631,
            value: 99
        }, {
            year: 1632,
            value: 98
        }, {
            year: 1633,
            value: 60
        }, {
            year: 1634,
            value: 84
        }, {
            year: 1635,
            value: 72
        }, {
            year: 1636,
            value: 104
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 150
        }, {
            year: 1648,
            value: 92
        }, {
            year: 1649,
            value: 215
        }, {
            year: 1650,
            value: 120
        }, {
            year: 1651,
            value: 134
        }, {
            year: 1652,
            value: 138
        }, {
            year: 1653,
            value: 135
        }, {
            year: 1654,
            value: 178
        }, {
            year: 1655,
            value: 166
        }, {
            year: 1656,
            value: 212
        }, {
            year: 1657,
            value: 203
        }, {
            year: 1658,
            value: 228
        }, {
            year: 1659,
            value: 210
        }, {
            year: 1660,
            value: 249
        }]
    }, {
        name: "Teeth, and Worms",
        description: "Although 'teeth' or 'breeding of the teeth' were commonly listed as causes of death, they say more about the age of the victim than the condition they died from. The terms relate to the developmental stage when children are teething, at which point they might succumb to a broad range of afflictions.",
        ValueLabelPos_desktop: {
            x: -45,
            y: -247
        },
        mobileData: false,
        imgID: 21,
        data: [{
            year: 1629,
            value: 440
        }, {
            year: 1630,
            value: 506
        }, {
            year: 1631,
            value: 335
        }, {
            year: 1632,
            value: 470
        }, {
            year: 1633,
            value: 432
        }, {
            year: 1634,
            value: 454
        }, {
            year: 1635,
            value: 539
        }, {
            year: 1636,
            value: 1207
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 767
        }, {
            year: 1648,
            value: 597
        }, {
            year: 1649,
            value: 540
        }, {
            year: 1650,
            value: 598
        }, {
            year: 1651,
            value: 709
        }, {
            year: 1652,
            value: 905
        }, {
            year: 1653,
            value: 691
        }, {
            year: 1654,
            value: 1131
        }, {
            year: 1655,
            value: 803
        }, {
            year: 1656,
            value: 1198
        }, {
            year: 1657,
            value: 878
        }, {
            year: 1658,
            value: 1036
        }, {
            year: 1659,
            value: 839
        }, {
            year: 1660,
            value: 1008

        }]
    },
];


TheCollectors.Interface = function() {
    var self = {},
        dom = {};
    var DATA = [];
    var SCREEN_MODE;
    self.Init = function(screenMode) {

        SCREEN_MODE = screenMode;
        $('.dragger').append('<div class=\'currentYear\'></div>');
        dom = {
            chart: $('#radial'),
            yearSelector: $('#yearSelector'),
            infoBox: $('#info-box-1'),
            infoBoxImg: $('#info-box-1>img'),
            infoBoxHeader: $('#info-box-1 h1'),
            infoBoxCopy: $('#info-box-1 p'),
            infoBoxBtn: $('#info-box-1 .btn'),
            noData: $('.no-data'),
            currentYear: $('.currentYear'),
            infoBoxYear: $('.info-box .year'),
            infoBoxDeaths: $('.info-box .number-of-deaths'),
            hideGlossaryBtn: $('header .hide-gloassary-btn'),
            showGlossaryBtn: $('header .show-gloassary-btn'),
        };

        dom.noData.css('opacity', 0);
        dom.currentYear.text(dom.yearSelector[0].value);



        getInitialData(SCREEN_MODE);
        updateData();
        dom.infoBox.hide();
        dom.hideGlossaryBtn.hide();
        loadData();
        buildBase();
        setScales();
        drawBars();
        addCircleAxes();
        addLineAxes();
        addOverlayBtns();
        globalEventListeners();
        eventListeners();
        updateInfoBoxValues();
    };

    self.changeScreenMode = function(screenMode) {
        SCREEN_MODE = screenMode;
        viz.selectAll("*").remove();
        viz.remove();
        //console.log("changing view to : ",SCREEN_MODE);
        getInitialData(SCREEN_MODE);
        updateData();
        dom.infoBox.hide();
        dom.hideGlossaryBtn.hide();
        loadData();
        buildBase();
        setScales();
        drawBars();
        addCircleAxes();
        addLineAxes();
        addOverlayBtns();
        eventListeners();
        updateInfoBoxValues();


    };

    var getInitialData = function(SCREEN_MODE) {
        DATA = TheCollectors.getData(SCREEN_MODE);
        axis = DATA.length;
        maxVal = Number(Math.sqrt(2500 * DATA.length / Math.PI));
    };

    var currentData = [];

    var timeseries, sdat, series, minVal = 0,
        radius, radiusLength;
    var maxVal;
    var w = 1500,
        h = 1000,
        axis, ruleColor = '#fff';
    var vizPadding = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    var innerRadiusVal = 8;
    var numticks = 5;
    var viz, vizBody, maxs, keys;
    var oldRadius = [];
    var newRadius = [];
    var labelWidth = [];
    var valueHolders;
    var SELECTED_ITEM = -1;
    var NO_DATA_YEAR = false;

    var updateInfoBoxValues = function() {
        dom.infoBoxYear.text(dom.yearSelector[0].value);
        if (SELECTED_ITEM > -1) dom.infoBoxDeaths.text(DATA[SELECTED_ITEM].data[dom.yearSelector[0].value - 1629].value);
    };
    var loadData = function() {
        sdat = [];
        keys = [];
        for (var j = 0; j < DATA.length; j++) {
            keys[j] = DATA[j].name;
        }
        for (i = 0; i <= numticks; i++) {
            sdat[i] = maxVal / numticks * i;
        }
    };
    var buildBase = function() {
        viz = d3.select('#radial').append('svg:svg').attr('viewBox', '0,0,' + w + ',' + h).attr("width", w + "px").attr("height", h + "px");
        viz.append('svg:rect').attr('x', 0).attr('y', 0).attr('height', 0).attr('width', 0).attr('height', 0);
        vizBody = viz.append('svg:g').attr('id', 'body');
    };
    var setScales = function() {
        var heightCircleConstraint, widthCircleConstraint, circleConstraint, centerXPos, centerYPos;
        heightCircleConstraint = h - vizPadding.top - vizPadding.bottom;
        widthCircleConstraint = w - vizPadding.left - vizPadding.right;
        circleConstraint = d3.min([
            heightCircleConstraint,
            widthCircleConstraint
        ]);
        radius = d3.scale.linear().domain([
            0,
            maxVal
        ]).range([
            0,
            circleConstraint / 2
        ]);
        radiusLength = radius(maxVal);
        centerXPos = widthCircleConstraint / 2 + vizPadding.left;
        centerYPos = heightCircleConstraint / 2 + vizPadding.top;
        vizBody.attr('transform', 'translate(' + centerXPos + ', ' + centerYPos + ')');
    };
    addCircleAxes = function() {
        var radialTicks = radius.ticks(numticks),
            circleAxes, i;
        vizBody.selectAll('.circle-ticks').remove();
        circleAxes = vizBody.selectAll('.circle-ticks').data(sdat).enter().append('svg:g').attr('class', 'circle-ticks');
        circleAxes.append('svg:circle').attr('r', function(d, i) {
            return radius(d);
        }).attr('class', 'circle').style('stroke', ruleColor).style('stroke-opacity', '0.7').style('opacity', 0.7).style('fill', 'none');
    };
    addLineAxes = function() {
        var radialTicks = radius.ticks(numticks),
            lineAxes;
        vizBody.selectAll('.line-ticks').remove();
        lineAxes = vizBody.selectAll('.line-ticks').data(keys).enter().append('svg:g').attr('transform', function(d, i) {
            var angle = i / axis * 360 - 90 + 360 / axis / 1.5;
            if (i > DATA.length / 2 - 1) {
                angle = i / axis * 360 - 90 + 360 / axis / 2.8;
            }
            var radiusForTextToStart;
            if (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP) {
                radiusForTextToStart = 20;
            } else {
                radiusForTextToStart = 5;
            }
            return 'rotate( ' + angle + ')translate(' + radius(radiusForTextToStart) + ')';
        }).attr('class', 'line-ticks');
        lineAxes.append('svg:text').text(function(d, i) {
            return keys[i];
        }).attr('text-anchor', 'right').attr('fill', '#e5254e').attr('font-size', function() {
            if (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP) {
                return 14;
            } else {
                return 30;
            }
        }).attr('class', 'label').attr('transform', function(d, i) {
            labelWidth[i] = $(this)[0].getBBox().width;
            if (i > DATA.length / 2 - 1) {
                return ' rotate(180,' + labelWidth[i] / 2 + ',' + 0 + ')';
            }
        });
        vizBody.selectAll('.value-label-holders').remove();

        valueHolders = vizBody.selectAll('.value-label-holders').data(keys).enter().append('svg:text').text(function(d, i) {
            return currentData[i].realValue;
        }).attr('class', 'value-label-holders opacity-transition display-opacity-0').attr('fill', function(d, i) {
            value = radius(currentData[i].y);
            value2 = Math.sqrt(Math.pow(DATA[i]["ValueLabelPos_" + SCREEN_MODE].x, 2) + Math.pow(DATA[i]["ValueLabelPos_" + SCREEN_MODE].y, 2));
            if (value > value2 + 6) {
                return 'white';
            } else {
                return 'black';
            }
        }).attr('x', function(d, i) {
            return DATA[i]["ValueLabelPos_" + SCREEN_MODE].x;
        }).attr('y', function(d, i) {
            return DATA[i]["ValueLabelPos_" + SCREEN_MODE].y;
        }).attr('font-size', function() {
            if (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP) {
                return 16;
            } else {
                return 30;
            }
        });
    };
    var drawBars = function() {
        var groups, bar;
        pie = d3.layout.pie().value(function(d) {
            return d;
        }).sort(null);
        d = [];
        for (i = 0; i < currentData.length; i++) {
            d.push(1);
        }
        groups = vizBody.selectAll('.series').data([d]);
        groups.enter().append('svg:g').attr('class', 'series').style('fill', 'blue').style('stroke', 'black');
        groups.exit().remove();
        bar = d3.svg.arc().innerRadius(innerRadiusVal).outerRadius(function(d, i) {
            oldRadius[i] = radius(currentData[i].y);
            return radius(currentData[i].y);
        });
        arcs = groups.selectAll('.series g.arc').data(pie).enter().append('g').attr('class', 'attr');
        arcs.append('path').attr('fill', 'black').attr('stroke', 'white').attr('stroke-opacity', '0.3').attr('d', bar).style('opacity', 1).style('cursor', 'pointer');
    };
    var addOverlayBtns = function() {
        var groups, bar;
        pie = d3.layout.pie().value(function(d) {
            return d;
        }).sort(null);
        d = [];
        for (i = 0; i < currentData.length; i++) {
            d.push(1);
        }
        groups = vizBody.selectAll('.series2').data([d]);
        groups.enter().append('svg:g').attr('class', 'series2').style('fill', 'blue').style('stroke', 'black');
        groups.exit().remove();
        bar = d3.svg.arc().innerRadius(innerRadiusVal).outerRadius(function(d, i) {
            return 500;
        });
        arcs = groups.selectAll('.series g.arc').data(pie).enter().append('g').attr('class', 'attr');
        arcs.append('path').attr('fill', 'yellow').attr('stroke', 'white').attr('fill-opacity', '0').attr('stroke-opacity', '0').attr('d', bar).style('opacity', 1).style('cursor', 'pointer');
    };
    var transition = function(val) {
        var bar = d3.svg.arc().innerRadius(innerRadiusVal).outerRadius(function(d, i) {
            return radius(currentData[i].y);
        });
        newRadius = [];
        for (i = 0; i < currentData.length; i++) {
            newRadius.push(radius(currentData[i].y));
        }
        path = d3.selectAll('#radial svg g.series path');
        path.each(function(dat, s) {
            d3.select(this).transition().duration(800).attrTween('d', function(a) {
                var k = d3.interpolate(oldRadius[s], newRadius[s]);
                return function(t) {

                    oldRadius[s] = k(t);

                    return bar.outerRadius(k(t))(a);
                };
            }).each('end', function() {
                oldRadius[s] = newRadius[s];
            });
        });
        valueHolders.each(function(dat, s) {
            d3.select(this).transition().duration(800).tween('text', function(d, id) {
                var i = d3.interpolate(this.textContent, currentData[s].realValue);
                return function(t, id) {
                    value = radius(currentData[s].y);
                    value2 = Math.sqrt(Math.pow(DATA[s]["ValueLabelPos_" + SCREEN_MODE].x, 2) + Math.pow(DATA[s]["ValueLabelPos_" + SCREEN_MODE].y, 2));
                    if (value > value2 + 6) {
                        d3.select(this).attr('fill', 'white');
                    } else {
                        d3.select(this).attr('fill', 'black');
                    }
                    this.textContent = Math.round(i(t));
                };
            });
        });
    };
    var updateData = function() {
        var yearIndex;
        if ((dom.yearSelector, dom.yearSelector[0].value > 1636) && (dom.yearSelector, dom.yearSelector[0].value < 1647)) {

            if (!NO_DATA_YEAR) {
                dom.chart.fadeTo(400, 0);
                dom.noData.fadeTo(400, 1);
                if (SELECTED_ITEM > -1)
                    dom.infoBox.fadeTo(200, 0);
            }
            NO_DATA_YEAR = true;
            yearIndex = 1636 - 1629;
        } else {

            if (NO_DATA_YEAR) {
                dom.chart.fadeTo(400, 1);
                if (SELECTED_ITEM > -1)
                    dom.infoBox.fadeTo(200, 1);
                dom.noData.fadeTo(400, 0);
            }
            NO_DATA_YEAR = false;
            yearIndex = dom.yearSelector[0].value - 1629;

        }
        currentData = [];
        for (var i = 0; i < DATA.length; i++) {

            if (!isNaN(DATA[i].data[yearIndex].value)) {
                var value = DATA[i].data[yearIndex].value;
                var chartValue = Number(Math.sqrt(value * DATA.length / Math.PI));

                if ((chartValue <= innerRadiusVal) && (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP)) {
                    //console.log('????',SCREEN_MODE==TheCollectors.SCREEN_MODE_DESKTOP,SCREEN_MODE)
                    chartValue = innerRadiusVal * 1.2;
                }

                if ((chartValue < innerRadiusVal) && (SCREEN_MODE == TheCollectors.SCREEN_MODE_MOBILE)) {
                    //console.log('????',chartValue,SCREEN_MODE==TheCollectors.SCREEN_MODE_DESKTOP,SCREEN_MODE)
                    chartValue = chartValue + innerRadiusVal;
                }


                var name = DATA[i].name;
                currentData.push({
                    y: chartValue,
                    realValue: value,
                    name: name,
                    id: i,
                    borderwidth: 0
                });
            }
        }
    };


    var globalEventListeners = function() {
        $('.dragger').on('mousedown touchstart', function() {
            dom.currentYear.addClass('currentYear-dragging');
        });
        $('body').on('mouseup touchend', function() {
            dom.currentYear.removeClass('currentYear-dragging');
        });

        dom.yearSelector.on('slider:changed', function(ev, d) {
            dom.currentYear.text(d.value);

            updateInfoBoxValues();
            updateData();
            transition();
        });


        dom.infoBoxBtn.on('click', function() {

            updateDisplayInfo(SELECTED_ITEM + 1);
        });
        dom.hideGlossaryBtn.on('click', function() {
            if (!NO_DATA_YEAR) {
                dom.showGlossaryBtn.show();
                dom.hideGlossaryBtn.hide();
                updateDisplayInfo(SELECTED_ITEM);
            }
        });


        dom.showGlossaryBtn.on('click', function() {
            if (!NO_DATA_YEAR) {
                dom.showGlossaryBtn.hide();
                dom.hideGlossaryBtn.show();
                updateDisplayInfo(0);
            }
        });
    };


    var eventListeners = function() {
        viz.selectAll('#radial svg g.series path, #radial svg g.series2 path').on('click', function(a, index) {

            if (!NO_DATA_YEAR) {
                updateDisplayInfo(index);
                updateInfoBoxValues();
            }

        });
        viz.selectAll('#radial svg g.series path, #radial svg g.series2 path').on('mouseover', function(a, index) {
            var id;
            if (index >= DATA.length) {
                id = index - DATA.length;
            }
            d3.select(valueHolders[0][id]).attr('class', "value-label-holders opacity-transition display-opacity-1");
        });
        viz.selectAll('#radial svg g.series path, #radial svg g.series2 path').on('mouseout', function(a, index) {
            var id;
            if (index >= DATA.length) {
                id = index - DATA.length;
            }
            if (id == SELECTED_ITEM) return;
            d3.select(valueHolders[0][id]).attr('class', "value-label-holders opacity-transition display-opacity-0");
        });
    };

    var updateDisplayInfo = function(index) {
        var paths = viz.selectAll('#radial svg g.series path');
        var labels = viz.selectAll('.line-ticks .label');
        var id = index;
        if (index >= DATA.length) {
            id = index - DATA.length;
        }

        d3.select(valueHolders[0][id]).attr('class', "value-label-holders opacity-transition display-opacity-1");
        if (SELECTED_ITEM == id) {
            d3.select(paths[0][SELECTED_ITEM]).attr('fill', 'black');
            d3.select(labels[0][SELECTED_ITEM]).attr('fill', '#e5254e');
            d3.select(valueHolders[0][id]).attr('class', "value-label-holders opacity-transition display-opacity-0");
            SELECTED_ITEM = -1;
            if ($(window).width() <= 768) {
                dom.hideGlossaryBtn.hide();
                dom.showGlossaryBtn.show();
            }
            updateBox();
            return;
        }
        if (SELECTED_ITEM > -1) {
            d3.select(paths[0][SELECTED_ITEM]).attr('fill', 'black');
            d3.select(labels[0][SELECTED_ITEM]).attr('fill', '#e5254e');
            d3.select(valueHolders[0][SELECTED_ITEM]).attr('class', "value-label-holders opacity-transition display-opacity-0");
            if ($(window).width() <= 768) {
                dom.hideGlossaryBtn.show();
                dom.showGlossaryBtn.hide();
            }

        }
        SELECTED_ITEM = id;
        if (SELECTED_ITEM > -1) {
            d3.select(paths[0][SELECTED_ITEM]).attr('fill', '#e5254e');
            d3.select(labels[0][SELECTED_ITEM]).attr('fill', 'white');
            if ($(window).width() <= 768) {
                dom.hideGlossaryBtn.show();
                dom.showGlossaryBtn.hide();
            }
        }
        updateBox();
    };
    var updateBox = function() {
        updateInfoBoxValues();
        var ar = TheCollectors.assetRoot;
        if (SELECTED_ITEM > -1) {
            dom.infoBox.fadeOut('fast', function() {
                dom.infoBoxImg.css('opacity', 0);
                dom.infoBoxImg.bind('load', function() {
                    dom.infoBoxImg.css('opacity', 1);
                });
                dom.infoBoxImg.attr('src', ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '.jpg');
                dom.infoBoxImg.attr('srcset', ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '.jpg 1x, ' +
                    ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '_x2.jpg 2x, ' +
                    ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '_x2.jpg 3x,' +
                    ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '_x2.jpg 4x,'
                );
                dom.infoBoxHeader.text(DATA[SELECTED_ITEM].name);
                dom.infoBoxCopy.text(DATA[SELECTED_ITEM].description);
                dom.infoBox.fadeIn();
            });
        } else {
            dom.infoBox.fadeOut('fast');
        }
    };
    return self;
}();
