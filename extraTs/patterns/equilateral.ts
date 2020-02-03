//let m = Number(process.argv[2]);
//equilateral(m);
function equilateral(a : number) : void {
    if (a > 2 && a < 11) {
        for (let i = 1; i <= a; i++) {
            let s = "";
            for (let j = 1; j <= a - i; j++)
                s = s + " ";
            for (let k = 0; k < 2 * i - 1; k++) {
                if (k % 2 == 0)
                    s = s + "*";
                else
                    s = s + " ";
            }
            console.log(s);

        }
    }
    else
        console.log("wrong choice");
}
export default equilateral;
