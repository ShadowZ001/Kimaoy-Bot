const productMap = {
    'nitro_boost': 'Nitro Boost',
    'nitro_basic': 'Nitro Basic',
    'deco_avatar': 'Avatar Decoration',
    'deco_profile': 'Profile Effect',
    'boost_14x1m': '14x Server Boosts (1 Month)',
    'boost_14x3m': '14x Server Boosts (3 Months)',
    'boost_2x1m': '2x Server Boosts (1 Month)',
    'exch_c2p': 'Crypto to PayPal',
    'exch_p2c': 'PayPal to Crypto',
    'exch_c2c': 'CashApp to Crypto',
    'exch_c2inr': 'Crypto to INR',
    'exch_inr2c': 'INR to Crypto',
    'exch_other': 'Other Exchanges'
};
const categoryMap = {
    'nitro': 'Nitro',
    'decorations': 'Decorations',
    'boosts': 'Server Boosts',
    'exchanges': 'Exchanges',
    'other': 'Other',
    'report': 'Problem / Report'
};
const typeOptionsMap = {
    'nitro': [
        { label: 'Nitro Boost', description: 'Choose Nitro Boost', emoji: { name: 'n1tr0boosts', id: '1535948139213881364' }, value: 'nitro_boost' },
        { label: 'Nitro Basic', description: 'Choose Nitro Basic', emoji: { name: 'NitroBasic', id: '1536431436406587462' }, value: 'nitro_basic' }
    ],
    'decorations': [
        { label: 'Avatar Decoration', description: 'Choose Avatar Decoration', emoji: { name: '0031_4', id: '1534543212495241327' }, value: 'deco_avatar' },
        { label: 'Profile Effect', description: 'Choose Profile Effect', emoji: { name: '0031_4', id: '1534543212495241327' }, value: 'deco_profile' }
    ],
    'boosts': [
        { label: '14x Boosts (1 Month)', description: '14x Server Boosts for 1 Month', emoji: { name: 'NitroBoost', id: '1536431337366360205' }, value: 'boost_14x1m' },
        { label: '14x Boosts (3 Months)', description: '14x Server Boosts for 3 Months', emoji: { name: 'NitroBoost', id: '1536431337366360205' }, value: 'boost_14x3m' },
        { label: '2x Boosts (1 Month)', description: '2x Server Boosts for 1 Month', emoji: { name: 'NitroBoost', id: '1536431337366360205' }, value: 'boost_2x1m' }
    ],
    'exchanges': [
        { label: 'Crypto to PayPal', description: 'Exchange Crypto to PayPal', emoji: { name: 'euro', id: '1535949201496735845' }, value: 'exch_c2p' },
        { label: 'PayPal to Crypto', description: 'Exchange PayPal to Crypto', emoji: { name: 'PayPal', id: '1536610499540684830' }, value: 'exch_p2c' },
        { label: 'CashApp to Crypto', description: 'Exchange CashApp to Crypto', emoji: { name: 'euro', id: '1535949201496735845' }, value: 'exch_c2c' },
        { label: 'Crypto to INR', description: 'Exchange Crypto to INR', emoji: { name: 'PhonePe', id: '1536610653106864189' }, value: 'exch_c2inr' },
        { label: 'INR to Crypto', description: 'Exchange INR to Crypto', emoji: { name: 'euro', id: '1535949201496735845' }, value: 'exch_inr2c' },
        { label: 'Other Exchanges', description: 'Any other exchange', emoji: { name: '0029_3', id: '1534543199421468692' }, value: 'exch_other' }
    ]
};
module.exports = { productMap, categoryMap, typeOptionsMap };
