lines = [line.rstrip("\n") for line in open('ProvinTuition.csv')]
lines = lines[8:]

map_industry = {'Goods producing': 'Goods Producting', 
'Engineering': 'Construction', 
'Architecture': 'Manufacturing', 
'Service': 'Service', 
'Transportation': 'Transportation',
'Business management and public administration': 'Finance', 
'Mathematics computer and information sciences': 'Technical Services', 
'Education': 'Education', 
'Other health parks recreation and fitness': 'Health Care',
'Visual and performing arts and communications technologies': 'Arts'}

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
					data[province][industry].append(values[index])
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
				indList.append('{0:.3f}'.format((-1)*float(value)/9000*40))
		formatted_data[province].append(indList)
# print(formatted_data)

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
		proList.append(str(map_provinces[province] + '-' + industry))
		proList.append(0)
		for value in industry_data[industry][province]:
			if value == '..' or value == 'F' or value == 'x':
				proList.append(0)
			else:
				proList.append(float('{0:.3f}'.format((-1)*float(value)/9000*40)))
		formatted_indData[industry].append(proList)

print(formatted_indData)
