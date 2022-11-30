#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <random>
#include <chrono>
#include <cmath>

using namespace std;

static unsigned long seed = (unsigned long) chrono::system_clock::now().time_since_epoch().count();
static mt19937 e = mt19937(seed);
static uniform_real_distribution<double> ri(0.0, 1.0);

string randColor()
{
	//TODO重写随机颜色生成算法，本算法生成黑色概率远大于其它颜色
	string result = "000000";
	char str[16] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };
	int i = 0;
	for (i = 0; i < 6; i++)
	{
		if (i % 2 == 0)
		{
			result[i] = str[(int)(ri(e) * 12)];
		}
		else
		{
			result[i] = str[(int)(ri(e) * 16)];
		}
	}

	return result;
}

string singleWord(string world)
{
	string result = "{\n\tword_list: [\"";
	result += world;
	result += "\"],\n\tlogic_and: false,\n\ttag: \"【 ";
	result += world;
	result += " 】\",\n\tcolor: \"#";
	result += randColor();
	result += "\"\n},\n";

	return result;
}

int main()
{
	fstream keyword("text.txt");

	if (!keyword)
	{
		cout << "Failed Open File" << endl;
		return 0;
	}

	vector<string> keyList;

	while (!keyword.eof())
	{
		string temp;
		keyword >> temp;
		if (temp[0] != '#')
		{
			keyList.push_back(temp);
		}
	}

	fstream output("output.txt");

	int i = 0;
	for (i = 0; i < (int)keyList.size(); i++)
	{
		cout << singleWord(keyList[i]);
		output << singleWord(keyList[i]);
	}

	cout << endl;

	keyword.close();
	output.close();

	return 0;
}