package TestCases;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
class Streampractice{
	public static void main(String []args) {
	List<Integer> ids=Arrays.asList(1,2,3,4,5,6,7,9);
	Stream<Integer> idss=ids.stream();
	Stream<Integer> self=Stream.generate(()->(int)Math.random() ).limit(3);
   List<Integer> odd= idss
		   .map(n->n*n)
		   .peek(n->System.out.println(n))
		   .filter(n->n>20)
		   .sorted((a,b)->b-a)
		   .max((a,b)->a-b)
		   .stream()
		   .collect(Collectors.toList());	
    System.out.println(odd);
}}