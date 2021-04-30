import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
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

const Policy: FC = () => {
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
          <Grid item xs={12} sm={3} style={{ minWidth: 216 }}>
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
                  プライバシーポリシー
                </Typograpy>
              </Box>
              <Box pt={paddingY * 2} pb={paddingY}>
                <Typograpy>
                  OOUI-MEMO
                  運営（以下、「運営者」といいます。）は、このウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、
                  ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第1条（個人情報の定義）
                </Typograpy>
                <Typograpy paragraph>
                  「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、
                  当該情報に含まれる氏名、連絡先その他の記述等により特定の個人を識別できる情報を指します。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第2条（個人情報の収集方法）
                </Typograpy>
                <Typograpy paragraph>
                  本サービスでは、ユーザーが利用登録をする際やフォームから問い合わせの際に、メールアドレスなどの個人情報をお尋ねすることがあります。
                  <br />
                  また、ユーザーと提携先（情報提供元等を含みます）などとの間でなされたユーザーの個人情報を含む取引記録に関する情報を、本サービスの提携先などから収集することがあります。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第3条（個人情報を収集・利用する目的）
                </Typograpy>
                <Typograpy paragraph>
                  本サービスにおいて個人情報を収集・利用する目的は、以下のとおりです。
                </Typograpy>
                <ol>
                  <li>
                    <Typograpy paragraph>
                      ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      メンテナンス、重要なお知らせなど必要に応じたご連絡のため
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      上記の利用目的に付随する目的
                    </Typograpy>
                  </li>
                </ol>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第4条（個人情報の第三者提供）
                </Typograpy>
                <Typograpy paragraph>
                  運営者は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。
                  <br />
                  ただし、個人情報保護法その他の法令で認められる場合を除きます。
                </Typograpy>
                <ol>
                  <li>
                    <Typograpy paragraph>
                      人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      予め次の事項を告知あるいは公表をしている場合
                    </Typograpy>
                    <ol>
                      <li>
                        <Typograpy paragraph>
                          利用目的に第三者への提供を含むこと
                        </Typograpy>
                      </li>
                      <li>
                        <Typograpy paragraph>
                          第三者に提供されるデータの項目
                        </Typograpy>
                      </li>
                      <li>
                        <Typograpy paragraph>
                          本人の求めに応じて個人情報の第三者への提供を停止すること
                        </Typograpy>
                      </li>
                    </ol>
                  </li>
                </ol>
                <Typograpy paragraph>
                  前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
                </Typograpy>
                <ol>
                  <li>
                    <Typograpy paragraph>
                      運営者が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
                    </Typograpy>
                  </li>
                  <li>
                    <Typograpy paragraph>
                      合併その他の事由による事業の承継に伴って個人情報が提供される場合
                    </Typograpy>
                  </li>
                </ol>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第5条（個人情報の訂正および削除）
                </Typograpy>
                <Typograpy paragraph>
                  ユーザーは、運営者の保有する自己の個人情報が誤った情報である場合には、運営者が定める手続きにより、
                  運営者に対して個人情報の訂正、追加または削除（以下、「訂正等」といいます。）を請求することができます。
                  <br />
                  運営者は、ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、
                  遅滞なく、当該個人情報の訂正等を行い、ユーザーに通知します。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第6条（プライバシーポリシーの変更）
                </Typograpy>
                <Typograpy paragraph>
                  本ポリシーの内容は、ユーザーに通知することなく、変更できるものとします。
                  運営者が別途定める場合を除いて、変更後のプライバシーポリシーは、本ページに掲載したときから効力を生じるものとします。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy component="h3" variant="h5" paragraph>
                  第7条（お問い合わせ窓口）
                </Typograpy>
                <Typograpy paragraph>
                  本ポリシーに関するお問い合わせは、
                  <Link
                    href="https://forms.gle/L5DfURnyjr9okFGy5"
                    target="_blank"
                    rel="noreferrer"
                  >
                    お問い合わせフォーム
                  </Link>
                  からお願いいたします。
                </Typograpy>
              </Box>
              <Box py={paddingY}>
                <Typograpy paragraph>2021年04月29日制定</Typograpy>
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

export default Policy;
