lines = [line.rstrip("\n") for line in open('ProvinWage.csv')]
lines = lines[8:]

map_industry = {'Goods producing industries 7': 'Goods Producting', 
'Construction': 'Construction', 
'Manufacturing': 'Manufacturing', 
'Service producing industries 9': 'Service', 
'Transportation and warehousing': 'Transportation',
'Finance and insurance': 'Finance', 
'Professional scientific and technical services': 'Technical Services', 
'Educational services': 'Education', 
'Health care and social assistance': 'Health Care',
'Arts entertainment and recreation': 'Arts'}

provinces = ['Newfoundland and Labrador', 'Prince Edward Island', 'Nova Scotia', 'New Brunswick', 
'Quebec', 'Ontario', 'Manitoba', 'Saskatchewan', 'Alberta', 'British Columbia']
map_provinces = {'Newfoundland and Labrador': 'NL', 'Prince Edward Island': 'PE', 'Nova Scotia': 'NS', 'New Brunswick': 'NB', 
'Quebec': 'QC', 'Ontario': 'OT', 'Manitoba': 'MB', 'Saskatchewan': 'SK', 'Alberta': 'AB', 'British Columbia': 'BC'}
# years=[2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
data = {'Newfoundland and Labrador':{}, 
'Prince Edward Island':{}, 
'Nova Scotia':{}, 
'New Brunswick': {}, 
'Quebec': {},
'Ontario': {}, 
'Manitoba': {}, 
'Saskatchewan': {}, 
'Alberta': {}, 
'British Columbia':{}}

for province in data:
	for industry in map_industry:
		data[province][map_industry[industry]] = []

for line in lines:
	linelist = line.split(',')
	if len(linelist) == 101:
		curInd = linelist[0].replace('"', '')
		if curInd in map_industry:
			values = linelist[1:]
			industry = map_industry[curInd]
			for j in range(10):
				province = provinces[j]
				for i in range(10):
					index = i + j * 10
					data[province][industry].append(values[index].replace('"', ''))

# print(data['British Columbia'])
formatted_data = {}
for province in data:
	formatted_data[province] = []
	for industry in data[province]:
		indList = []
		indList.append(str(map_provinces[province] + '-' + industry))
		indList.append(0)
		for value in data[province][industry]:
			if value == '..' or value == 'F' or value == 'x':
				indList.append(0)
			else:
				indList.append(float(value))
		formatted_data[province].append(indList)
#print(formatted_data['British Columbia'])

# data format for wage rate will be like:
# {'AB':{
# 		'Goods Producing':[33.04, 32.06 .....] # for 10 years
# 		'Construction': [28.63....],
# 	},
# 'BC':{
# 		'Goods Producing':[33.04...],
# 		'Construction':[28.63...],
# 	}
# }

#}}


industry_data = {'Goods Producting': {}, 
'Construction':{}, 
'Manufacturing':{}, 
'Service':{}, 
'Transportation':{},
'Finance':{}, 
'Technical Services':{}, 
'Education':{}, 
'Arts':{}}

for province in data:
	for industry in industry_data:
		if province not in industry_data[industry]:
			industry_data[industry][province] = []
		industry_data[industry][province] = data[province][industry]
# print(industry_data)

formatted_indData = {}
for industry in industry_data:
	formatted_indData[industry] = []
	for province in industry_data[industry]:
		proList = []
		proList.append(str(industry + '-' + map_provinces[province]))
		proList.append(0)
		for value in industry_data[industry][province]:
			if value == '..' or value == 'F' or value == 'x':
				proList.append(0)
			else:
				proList.append(float(value))
		formatted_indData[industry].append(proList)
print(formatted_indData)

# after clicked switch button, data becomes industry based
# {'Education':{
# 		'BC':[]
		# 'AB':[]
# 	}
# }