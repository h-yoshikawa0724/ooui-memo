import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typograpy from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from '../../containers/organisms/Header';
import HelpSideBar from '../organisms/HelpSideBar';
import Footer from '../organisms/Footer';

const useStyles = makeStyles(() => ({
  decorationLine: {
    borderImage: 'linear-gradient(0.25turn, transparent, #888, transparent)',
    borderImageSlice: 1,
  },
}));

const Terms: FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const paddingY = 2;
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Grid
          container
          spacing={3}
          style={{
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
          }}
        >
          <Grid item xs={12} sm={3}>
            <HelpSideBar />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper
              component="article"
              style={{
                padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
              }}
            >
              <Box
                py={paddingY}
                borderBottom={2}
                className={classes.decorationLine}
              >
                <Typograpy align="center" component="h2" variant="h4">
                  利用規約
                </Typograpy>
              </Box>
              <Box pt={paddingY * 2} pb={paddingY}>
                <Typograpy>
                  この利用規約（以下、「本規約」といいます。）は、OOUI-MEMO
                  運営（以下、「運営者」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。
                  <br />
                  本サービス利用者の皆さま（以下、「利用者」といいます。）には、本規約に従って、本サービスをご利用いただきます。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第1条（適用）
                </Typograpy>
                <ol>
                  <li>
                    <Typograpy paragraph>
                      本規約は、利用者と運営者との間の本サービスの利用に関わる一切の関係に適用されるものとします。
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      運営者は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。
                      これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      本規約は、利用者と運営者との間の本サービスの利用に関わる一切の関係に適用されるものとします。
                    </Typograpy>
                  </li>
                </ol>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第2条（利用資格）
                </Typograpy>
                <Typograpy paragraph>
                  本サービスは以下の条件をすべて満たす方に限り、ご利用いただくことができます。
                </Typograpy>
                <ol>
                  <li>
                    <Typograpy paragraph>
                      本規約に同意かつ遵守できる方
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      過去に本規約に違反したことのない方
                    </Typograpy>
                  </li>
                </ol>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第3条（利用者IDおよびパスワードの管理）
                </Typograpy>
                <ol>
                  <li>
                    <Typograpy paragraph>
                      利用者は、自己の責任において、本サービスの利用者IDおよびパスワードを適切に管理するものとします。
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      利用者は、いかなる場合にも、利用者IDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。
                      運営者は、利用者IDとパスワードの組み合わせが登録情報と一致してログインされた場合には、その利用者IDを登録している利用者自身による利用とみなします。
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      利用者ID及びパスワードが第三者によって使用されたことによって生じた損害は、運営者に故意又は重大な過失がある場合を除き、運営者は一切の責任を負わないものとします。
                    </Typograpy>
                  </li>
                </ol>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第4条（禁止事項）
                </Typograpy>
                <Typograpy paragraph>
                  利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。
                </Typograpy>
                <ol>
                  <li>
                    <Typograpy paragraph>
                      法令または公序良俗に違反する行為
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>犯罪行為に関連する行為</Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      本サービスの利用者および運営者、第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      運営者、ほかの利用者、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      運営者のサービスの運営を妨害するおそれのある行為
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      不正アクセスをし、またはこれを試みる行為
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      他の利用者に関する個人情報等を収集または蓄積する行為
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      不正な目的を持って本サービスを利用する行為
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      本サービスの他の利用者またはその他の第三者に不利益、損害、不快感を与える行為
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>他の利用者に成りすます行為</Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      運営者が許諾しない本サービス上での宣伝、広告、勧誘、または営業行為
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      面識のない異性との出会いを目的とした行為
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      運営者のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      その他、運営者が不適切と判断する行為
                    </Typograpy>
                  </li>
                </ol>
                <Typograpy paragraph>
                  これらの行為が発覚した場合、当該コンテンツの削除、あるいはその利用者のアカウントを削除する場合があります。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第5条（本サービスの提供の停止等）
                </Typograpy>
                <ol>
                  <li>
                    <Typograpy paragraph>
                      運営者は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                    </Typograpy>
                    <ol>
                      <li>
                        <Typograpy paragraph>
                          本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
                        </Typograpy>
                      </li>
                      <li>
                        <Typograpy paragraph>
                          地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                        </Typograpy>
                      </li>
                      <li>
                        <Typograpy paragraph>
                          コンピュータまたは通信回線等が事故により停止した場合
                        </Typograpy>
                      </li>
                      <li>
                        <Typograpy paragraph>
                          本サービスが利用しているクラウドサービスが停止した場合
                        </Typograpy>
                      </li>
                      <li>
                        <Typograpy paragraph>
                          その他、運営者が本サービスの提供が困難と判断した場合
                        </Typograpy>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      運営者は、本サービスの提供の停止または中断により、利用者または第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
                    </Typograpy>
                  </li>
                </ol>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第6条（退会および登録抹消）
                </Typograpy>
                <Typograpy paragraph>
                  利用者はいつでも登録されたアカウントを削除（退会）することができます。
                  <br />
                  また、利用者が本規約に違反した場合、運営者は事前の通知なく、アカウントに関わるデータを削除し、登録を抹消できるものとします。
                </Typograpy>
                <Typograpy paragraph>
                  退会および登録抹消に伴い利用者に生じた損害または不利益について、運営者は一切の責任を負いません。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第7条（保証の否認および免責事項）
                </Typograpy>
                <ol>
                  <li>
                    <Typograpy paragraph>
                      運営者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      運営者は、本サービスに関して、利用者と他の利用者または第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
                    </Typograpy>
                  </li>
                </ol>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第8条（サービス内容の変更等）
                </Typograpy>
                <Typograpy paragraph>
                  運営者は、利用者に通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによって利用者に生じた損害について一切の責任を負いません。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第9条（利用規約の変更）
                </Typograpy>
                <Typograpy paragraph>
                  運営者は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。
                  なお、本規約の変更後、本サービスの利用を開始した場合には、当該利用者は変更後の規約に同意したものとみなします。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第10条（個人情報の取扱い）
                </Typograpy>
                <Typograpy paragraph>
                  運営者は、本サービスの利用によって取得する個人情報については、「プライバシーポリシー」に従い適切に取り扱うものとします。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第11条（通知または連絡）
                </Typograpy>
                <Typograpy paragraph>
                  利用者と運営者との間の通知または連絡は、運営者の定める方法によって行うものとします。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第12条（権利義務の譲渡の禁止）
                </Typograpy>
                <Typograpy paragraph>
                  利用者は、運営者の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第13条（準拠法・裁判管轄）
                </Typograpy>
                <Typograpy paragraph>
                  本規約の解釈にあたっては、日本法を準拠法とします。
                  <br />
                  本サービスに関して紛争が生じた場合には、運営者所在地を管轄する裁判所を専属的合意管轄裁判所とします。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  附則
                </Typograpy>
                <Typograpy paragraph>2021年04月26日制定</Typograpy>
                <Typograpy align="right" paragraph>
                  以上
                </Typograpy>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Terms;
