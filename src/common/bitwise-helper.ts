import bitwise from 'bitwise';

// Vanilla JS
// 21 ^ 23
// (0b10101 ^ 0b10111).toString(2)
// // '10'
// (0b10101 ^ 0b10111 ^ 0b10111).toString(2)
// // '10101'

const bits21 = bitwise.byte.read(21);

bitwise.bits.toString(bits21, 4);

bitwise.byte.write(bits21);

const bits23 = bitwise.byte.read(23);

console.log(`key: ${bitwise.bits.toString(bits23, 4)}`);
console.log(`bits21(p1): ${bitwise.bits.toString(bits21, 4)}`);

const XOR_21_ONCE = bitwise.bits.xor(bits21, bits23);

console.log('XOR_21_ONCE', bitwise.bits.toString(XOR_21_ONCE, 4));

const XOR_21_TWICE = bitwise.bits.xor(XOR_21_ONCE, bits23);

console.log('XOR_21_TWICE', bitwise.bits.toString(XOR_21_TWICE, 4));

const bits66 = bitwise.byte.read(66);

bitwise.bits.toString(bits66, 4);

bitwise.byte.write(bits66);

console.log(`bits66(P2): ${bitwise.bits.toString(bits66, 4)}`);

const XOR_66_ONCE = bitwise.bits.xor(bits66, bits23);

console.log('XOR_66_ONCE', bitwise.bits.toString(XOR_66_ONCE, 4));

const C1_XOR_C2 = bitwise.bits.xor(XOR_21_ONCE, XOR_66_ONCE);

console.log('C1_XOR_C2', bitwise.bits.toString(C1_XOR_C2, 4));

const result = bitwise.bits.xor(C1_XOR_C2, bits66);

// 初始向量的值依密码演算法而不同。最基本的要求是“唯一性”，也就是说同一把金钥不重复使用同一个初始向量。这个特性无论在区块加密或串流加密中都非常重要。
// 范例： 对明文P做串流加密，转换成密文C。所使用的是串流金钥K，它来自金钥与初始向量。我们可以得到等式：C = P xor K。假如攻击者得知密文C1与C2来自同一把金钥与初始向量。那么攻击者就能透过底下公式得到明文P1与P2：
// C1 xor C2 = (P1 xor K) xor (P2 xor K) = P1 xor P2.
console.log('C1_XOR_C2 XOR P2 === P1', bitwise.bits.toString(result, 4));

window.bitwise = bitwise;

export {
    bitwise,
};