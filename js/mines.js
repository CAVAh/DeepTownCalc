const mines = [
	{
		area: '1',
		coal: '100'
	}, {
		area: '2',
		coal: '70',
		copper: '30'
	}, {
		area: '3',
		coal: '59',
		copper: '28',
		iron: '9',
		amber: '2',
		gold: '1'
	}, {
		area: '4',
		coal: '54',
		copper: '32',
		iron: '10',
		amber: '2',
		gold: '1'

	}, {
		area: '5',
		coal: '48',
		copper: '36',
		iron: '11',
		amber: '2',
		gold: '1'
	}, {
		area: '6',
		coal: '43',
		copper: '40',
		iron: '12',
		amber: '2',
		gold: '1'
	}, {
		area: '7',
		coal: '38',
		copper: '45',
		iron: '13',
		amber: '2',
		gold: '1'
	}, {
		area: '8',
		coal: '33',
		copper: '49',
		iron: '14',
		amber: '1',
		gold: '2'
	}, {
		area: '9',
		coal: '27',
		copper: '53',
		iron: '15',
		amber: '1',
		gold: '2'
	}, {
		area: '10',
		coal: '22',
		copper: '57',
		iron: '16',
		amber: '1',
		gold: '2'
	}, {
		area: '11',
		coal: '17',
		copper: '61',
		iron: '17',
		amber: '1',
		gold: '2'
	}, {
		area: '12',
		coal: '12',
		copper: '65',
		iron: '18',
		amber: '1',
		gold: '2'
	}, {
		area: '13',
		copper: '100'
	}, {
		area: '14',
		copper: '70',
		iron: '30'
	}, {
		area: '15',
		copper: '58',
		iron: '19',
		coal: '7',
		amber: '9',
		aluminum: '3',
		silver: '2'
	}, {
		area: '16',
		copper: '52',
		iron: '19',
		amber: '15',
		coal: '4',
		aluminum: '6',
		silver: '2',
		gold: '2'
	}, {
		area: '17',
		copper: '46',
		iron: '19',
		amber: '20',
		coal: '4',
		aluminum: '7',
		silver: '1.5',
		gold: '1.5'
	}, {
		area: '18',
		copper: '40',
		iron: '18',
		amber: '25',
		coal: '4.5',
		aluminum: '8',
		silver: '1.5',
		gold: '1.5'
	}, {
		area: '19',
		copper: '35',
		iron: '18',
		amber: '30',
		coal: '5',
		aluminum: '10',
		silver: '1.5',
		gold: '1.5'
	}, {
		area: '20',
		copper: '29',
		iron: '18',
		amber: '35',
		aluminum: '11',
		coal: '3.5',
		silver: '1',
		gold: '1'
	}, {
		area: '21',
		copper: '23',
		iron: '18',
		amber: '40',
		aluminum: '13',
		coal: '3',
		silver: '1',
		gold: '1'
	}, {
		area: '22',
		copper: '17',
		iron: '17',
		amber: '45',
		aluminum: '15',
		coal: '2.5',
		silver: '2',
		gold: '.5'
	}, {
		area: '23',
		copper: '11',
		iron: '17',
		amber: '50',
		aluminum: '16',
		coal: '1',
		silver: '3',
		gold: '.5'
	}, {
		area: '24',
		copper: '5',
		iron: '17',
		amber: '55',
		aluminum: '18',
		coal: '1',
		silver: '4'
	}, {
		area: '25',
		amber: '100'
	}, {
		area: '26',
		amber: '70',
		aluminum: '30'
	}, {
		area: '27',
		iron: '19',
		amber: '50',
		aluminum: '26',
		silver: '4'
	}, {
		area: '28',
		iron: '20',
		amber: '45',
		aluminum: '30',
		silver: '5'
	}, {
		area: '29',
		iron: '21',
		amber: '40',
		aluminum: '33',
		silver: '5'
	}, {
		area: '30',
		iron: '22',
		amber: '35',
		aluminum: '36',
		silver: '6'
	}, {
		area: '31',
		iron: '23',
		amber: '30',
		aluminum: '40',
		silver: '6'
	}, {
		area: '32',
		iron: '24',
		amber: '25',
		aluminum: '43',
		silver: '7'
	}, {
		area: '33',
		iron: '25',
		amber: '19',
		aluminum: '46',
		silver: '8'
	}, {
		area: '34',
		iron: '26',
		amber: '15',
		aluminum: '50',
		silver: '8'
	}, {
		area: '35',
		iron: '27',
		aluminum: '53',
		amber: '11.5',
		silver: '7.5'
	}, {
		area: '36',
		iron: '28',
		aluminum: '56',
		amber: '8',
		silver: '6'
	}, {
		area: '37',
		aluminum: '100'
	}, {
		area: '38',
		iron: '30',
		aluminum: '70'
	}, {
		area: '39',
		iron: '25',
		aluminum: '50',
		silver: '11',
		gold: '10',
		emerald: '4'
	}, {
		area: '40',
		iron: '22',
		aluminum: '45',
		silver: '11',
		gold: '15',
		emerald: '6'
	}, {
		area: '41',
		iron: '20',
		aluminum: '40',
		silver: '12',
		gold: '20',
		emerald: '8'
	}, {
		area: '42',
		iron: '17',
		aluminum: '35',
		silver: '12',
		gold: '25',
		emerald: '10'
	}, {
		area: '43',
		iron: '15',
		aluminum: '30',
		silver: '13',
		gold: '30',
		emerald: '11'
	}, {
		area: '44',
		iron: '23',
		aluminum: '25',
		silver: '14',
		gold: '35',
		emerald: '13'
	}, {
		area: '45',
		iron: '10',
		aluminum: '19',
		silver: '14',
		gold: '40',
		emerald: '15'
	}, {
		area: '46',
		iron: '8',
		aluminum: '15',
		silver: '15',
		gold: '45',
		emerald: '17'
	}, {
		area: '47',
		silver: '15',
		gold: '50',
		emerald: '19',
		iron: '5',
		aluminum: '10'
	}, {
		area: '48',
		silver: '16',
		gold: '55',
		emerald: '21',
		iron: '3',
		aluminum: '5'
	}, {
		area: '49',
		gold: '100'
	}, {
		area: '50',
		gold: '70',
		emerald: '30'
	}, {
		area: '51',
		silver: '14',
		gold: '50',
		emerald: '25'
	}, {
		area: '52',
		silver: '12',
		gold: '45',
		emerald: '27'
	}, {
		area: '53',
		silver: '11',
		gold: '40',
		emerald: '28'
	}, {
		area: '54',
		gold: '35',
		emerald: '30',
		ruby: '12'
	}, {
		area: '55',
		gold: '30',
		emerald: '31',
		ruby: '15'
	}, {
		area: '56',
		gold: '25',
		emerald: '32',
		ruby: '17',
		diamond: '11'
	}, {
		area: '57',
		gold: '19',
		emerald: '34',
		ruby: '20',
		diamond: '13'
	}, {
		area: '58',
		gold: '15',
		emerald: '35',
		ruby: '22',
		diamond: '15'
	}, {
		area: '59',
		emerald: '37',
		ruby: '25',
		diamond: '16'
	}, {
		area: '60',
		emerald: '38',
		ruby: '27',
		diamond: '18'
	}, {
		area: '61',
		emerald: '100'
	}, {
		area: '62',
		emerald: '70',
		ruby: '30'
	}, {
		area: '63',
		emerald: '33',
		topaz: '13',
		ruby: '31',
		diamond: '16'
	}, {
		area: '64',
		emerald: '30',
		topaz: '15',
		ruby: '32',
		diamond: '15'
	}, {
		area: '65',
		emerald: '26',
		topaz: '16',
		ruby: '33',
		diamond: '13'
	}, {
		area: '66',
		emerald: '23',
		topaz: '18',
		ruby: '34',
		diamond: '11'
	}, {
		area: '67',
		emerald: '20',
		ruby: '35',
		topaz: '20'
	}, {
		area: '68',
		emerald: '16',
		topaz: '21',
		ruby: '35',
		sapphire: '11'
	}, {
		area: '69',
		emerald: '13',
		topaz: '23',
		ruby: '36',
		sapphire: '13'
	}, {
		area: '70',
		topaz: '25',
		ruby: '37',
		sapphire: '15'
	}, {
		area: '71',
		topaz: '26',
		ruby: '38',
		sapphire: '16'
	}, {
		area: '72',
		ruby: '39',
		topaz: '28',
		sapphire: '18'
	}, {
		area: '73',
		ruby: '100'
	}, {
		area: '74',
		ruby: '70',
		topaz: '30'
	}, {
		area: '75',
		topaz: '25',
		ruby: '33',
		sapphire: '16',
		amethyst: '15',
		alexandrite: '4',
		titanium: '2',
		uranium: '2',
		platinum: '1'
	}, {
		area: '76',
		topaz: '22',
		ruby: '30',
		sapphire: '15',
		amethyst: '17',
		alexandrite: '6',
		titanium: '4',
		uranium: '3',
		platinum: '1'
	}, {
		area: '77',
		topaz: '200',
		ruby: '26',
		sapphire: '14',
		amethyst: '20',
		alexandrite: '8',
		titanium: '7',
		uranium: '3',
		platinum: '1'
	}, {
		area: '78',
		topaz: '17',
		ruby: '23',
		sapphire: '13',
		amethyst: '22',
		alexandrite: '11',
		titanium: '8',
		uranium: '4',
		platinum: '1'
	}, {
		area: '79',
		topaz: '15',
		ruby: '20',
		sapphire: '12',
		amethyst: '25',
		alexandrite: '13',
		titanium: '9',
		uranium: '4',
		platinum: '1'
	}, {
		area: '80',
		topaz: '12',
		ruby: '16',
		amethyst: '27',
		sapphire: '11',
		alexandrite: '15',
		titanium: '11',
		uranium: '5',
		platinum: '2'
	}, {
		area: '81',
		topaz: '6',
		ruby: '13',
		amethyst: '30',
		sapphire: '10',
		alexandrite: '18',
		titanium: '13',
		uranium: '7',
		platinum: '2'
	}, {
		area: '82',
		topaz: '4',
		ruby: '11',
		amethyst: '32',
		sapphire: '7',
		alexandrite: '20',
		titanium: '15',
		uranium: '8',
		platinum: '2'
	}, {
		area: '83',
		topaz: '3',
		ruby: '6',
		amethyst: '35',
		sapphire: '6',
		alexandrite: '22',
		titanium: '16',
		uranium: '9',
		platinum: '2'
	}, {
		area: '84',
		topaz: '2',
		ruby: '3',
		amethyst: '37',
		sapphire: '2',
		alexandrite: '24',
		titanium: '18',
		uranium: '9',
		platinum: '2'
	}, {
		area: '85',
		amethyst: '100'
	}, {
		area: '86',
		amethyst: '70',
		alexandrite: '30'
	}, {
		area: '87',
		amethyst: '36',
		titanium: '26',
		alexandrite: '25',
		platinum: '9',
		uranium: '2'
	}, {
		area: '88',
		amethyst: '35',
		titanium: '30',
		alexandrite: '24',
		platinum: '9',
		uranium: '2'
	}, {
		area: '89',
		amethyst: '33',
		titanium: '33',
		alexandrite: '23',
		platinum: '9',
		uranium: '1'
	}, {
		area: '90',
		amethyst: '31',
		titanium: '36',
		alexandrite: '22',
		platinum: '8',
		uranium: '1'
	}, {
		area: '91',
		amethyst: '30',
		titanium: '40',
		alexandrite: '22',
		platinum: '7',
		uranium: '1'
	}, {
		area: '92',
		amethyst: '28',
		titanium: '43',
		alexandrite: '21',
		platinum: '6',
		uranium: '1'
	}, {
		area: '93',
		amethyst: '26',
		titanium: '46',
		alexandrite: '20',
		platinum: '6',
		uranium: '1'
	}, {
		area: '94',
		amethyst: '25',
		titanium: '50',
		alexandrite: '19',
		platinum: '4',
		uranium: '1'
	}, {
		area: '95',
		amethyst: '23',
		titanium: '53',
		alexandrite: '18',
		platinum: '4',
		uranium: '1'
	}, {
		area: '96',
		amethyst: '21',
		titanium: '56',
		alexandrite: '17',
		platinum: '3',
		uranium: '1'
	}
];
const mineRpm = [
	0, /* Level 0 */
	3, /* Level 1 */
	4, /* Level 2 */
	5, /* Level 3 */
	6, /* Level 4 */
	8, /* Level 5 */
	12, /* Level 6 */
	15, /* Level 7 */
	17, /* Level 8 */
	20 /* Level 9 */
];