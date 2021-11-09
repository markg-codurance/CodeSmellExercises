##First Refactor

####Refactors used
* `Extract Method`

Here we have used the `Extract Method` refactor several times to *encapsulate* the functionality in private functions. This is to enhance
readability so that looking at the public method 'tells' the reader what is happening, not how it is happening.
This approach means that the methods can be reused, reducing duplication, and it isolates code into a specific area
which in turn reduces the chance for errors. **[DRY principle]** **[Encapsulation]**

* `Replace Temp with Query`

In the original code on line 26 we had `let remainingBalance = this.balance - amountPaid;` this has been replaced
so that we can easily perform the `Extract Method` refactor for this section of code if we need to. This isn't really a big problem, 
but refactoring can enhance the readability of the code. It also has the secondary effect of reducing duplication 
if the line is used in multiple places. Now, applying this refactor may have a minor hit on performance for calling
the new method, but the hit is very small and not really something we should be concerned with in every-day applications.

Finally, the exception was thrown earlier rather than having to wait for other code to be parsed. Then the `Extract Method`
refactor was used to *encapsulate* that particular check. This provides an easier first read of the public method.