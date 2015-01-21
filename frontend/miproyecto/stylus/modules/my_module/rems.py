import re

bienvenida = """
Bienvenido al sistema arregla rems
Ingrese el archivo a arreglar

-
"""
base = 14
#filename = raw_input(bienvenida)
filename = "index.styl"
my_file = open(filename, 'r')

print 'leyendo el archivo...'

def getNumber(cadena):
	cadena = cadena.split('rem')
	return float(cadena[0])
new_file = ''
for line in my_file:
	words = line.split(' ')
	new_line=list()
	for word in words:
		print word
		if 'rem' in word:
			number =getNumber(word)
			new_word = 'px_to_rem(%0.2f)' % (number*base)
			new_line.append(new_word)
		new_line.append(word)
		print ' '.join(new_line)
		new_file += ' '.join(new_line)