import datetime

def current_mask():
	refday1 = datetime.date(2020, 4, 16)

	today = datetime.date.today()
	todaystime = datetime.datetime.now()
	time = todaystime.hour

	diff = today - refday1
	diffnum = diff.days

	# Continue showing previous day's mask number if it's just after midnight
	if time < 4:
		diffnum -= 1

	diffnum = diffnum % 4
	masknum = diffnum + 1

	return masknum


if __name__ == '__main__':
	print(current_mask())
