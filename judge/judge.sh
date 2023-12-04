#!/bin/bash

CE=0
RTE=0
if [ $# -eq 5 ]
then {
    if [ $1 = "cpp" ] || [ $1 = "cpp11" ] || [ $1 = "cpp14" ] || [ $1 = "cpp17" ] 
    then {
        {
            cat $5 | ../usr/bin/time -f "%e %M" -o $2 timeout $4s ./solution &> $3
        } || {
            RTE=1
        } } 
    elif [ $1 = "java8" ] 
    then {
    {
        file='*.class'
        fer=`echo $file`
        filename=`echo ${fer:0:-6}`
        cat $5 | ../usr/bin/time -f "%e %M" -o $2 timeout $4s java $filename &> $3 
    } || {
        RTE=1
    } } 
    elif [ $1 = 'python3' ]
    then {
        if { cat $5 | ../usr/bin/time -f "%e %M" -o "$2" timeout "$4"s python3 solution.py &> "$3"; } || { RTE=1; }; 
        fi
    }
    elif [ $1 = "fpc" ] 
    then {
        file='*.o'
        fer=`echo $file`
        # echo $fer
        {
            cat $5 | ../usr/bin/time -f "%e %M" -o $2 timeout $4s ./solution &> $3
        } || {
            RTE=1
        } } 
    
    fi
}
else {
    # ls
    if [ $1 = "cpp" ] 
    then {
        g++ -Wall -lm -static -DEVAL -o solution -O2 solution.cpp &> $2
    } || {
        CE=1
    } 
    elif [ $1 = "c" ] 
    then {
        gcc -Wall -lm -static -DEVAL -o solution -O2 solution.c &> $2
    } || {
        CE=1
    }
    elif [ $1 = "cpp11" ] 
    then {
        g++ -Wall -lm -static -DEVAL -o solution -O2 solution.cpp -std=c++11 &> $2
    } || {
        CE=1
    }
    elif [ $1 = "cpp14" ] 
    then {
        g++ -Wall -lm -static -DEVAL -o solution -O2 solution.cpp -std=c++14 &> $2
    } || {
        CE=1
    }
    elif [ $1 = "cpp17" ] 
    then {
        g++ -Wall -lm -static -DEVAL -o solution -O2 solution.cpp -std=c++17 &> $2
    } || {
        CE=1
    }
    elif [ $1 = "java8" ] 
    then {
        file='*.class'
        rm `echo $file`
        javac -J-Xms128m -J-Xmx512m -encoding UTF-8  solution.java &> $2
    } || {
        CE=1
    }
    elif [ $1 = "fpc" ] 
    then {
        file='*.o'
        rm `echo $file`
        fpc solution.pas  -o'solution' &> $2
    } || {
        CE=1
    }
    elif [ $1 = "pascal" ] 
    then {
        # wine '../opt/pabcnetc/PascalABCNETLinux/pabcnetc.exe'
        # chmod +x $file  solution.pas &> $2
        '../opt/pabcnetc/PascalABCNETLinux/pabcnetc.exe' solution.pas &> $2
    } || {
        CE=1
    }
    fi 
}
fi

# cd ../opt/pabcnetc/
# cd ..
# cd opt
# cd pabcnetc
# cd PascalABCNETLinux
# # # mono_pabcnetc.bat
# ls
# echo `cat $2`

if [[ $CE -eq 1 ]]
then
    echo "COMPILATION ERROR" >> $2
fi

if [[ $RTE -eq 1 ]]
then
    echo "RUNTIME ERROR" >> $2
fi
